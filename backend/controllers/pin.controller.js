import Pin from "../models/pin.model.js";
import User from "../models/user.model.js";
import Like from "../models/like.model.js";
import Save from "../models/save.model.js";
import Board from "../models/board.model.js";
import sharp from "sharp";
import Imagekit from "imagekit";
import jwt from "jsonwebtoken";

export const getPins = async (req, res) => {
  const pageNumber = Number(req.query.cursor) || 0;
  const search = req.query.search;
  const userId = req.query.userId;
  const boardId = req.query.boardId;
  const saved = req.query.saved;

  const LIMIT = 21;

  let query = {};

  if (search) {
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } }
      ],
    };
  } 
  else if (saved === "true") {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication required for saved pins" });
    }
    
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const savedPins = await Save.find({ user: payload.userId }).select("pin");
      const pinIds = savedPins.map((s) => s.pin);
      query = { _id: { $in: pinIds } };
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } 
  else if (userId) {
    query = { user: userId };
  } 
  else if (boardId) {
    query = { board: boardId };
  }

  const pins = await Pin.find(query)
    .limit(LIMIT)
    .skip(pageNumber * LIMIT);

  const hasNextPage = pins.length === LIMIT;

  res.status(200).json({
    pins,
    nextCursor: hasNextPage ? pageNumber + 1 : null,
  });
};

export const getPin = async (req, res) => {
  const { id } = req.params;
  const pin = await Pin.findById(id).populate(
    "user",
    "username img displayName"
  );


  res.status(200).json(pin);
};

export const createPin = async (req, res) => {
  const {
    title,
    description,
    link,
    board,
    tags,
    textOptions,
    canvasOptions,
    newBoard,
  } = req.body;

  const media = req.files.media;

  if ((!title, !description, !media)) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const parsedTextOptions = JSON.parse(textOptions || "{}");
  const parsedCanvasOptions = JSON.parse(canvasOptions || "{}");

  const metadata = await sharp(media.data).metadata();

  const originalOrientation =
    metadata.width < metadata.height ? "portrait" : "landscape";
  const originalAspectRatio = metadata.width / metadata.height;

  let clientAspectRatio;
  let width;
  let height;

  if (parsedCanvasOptions.size !== "original") {
    clientAspectRatio =
      parsedCanvasOptions.size.split(":")[0] /
      parsedCanvasOptions.size.split(":")[1];
  } else {
    parsedCanvasOptions.orientation === originalOrientation
      ? (clientAspectRatio = originalOrientation)
      : (clientAspectRatio = 1 / originalAspectRatio);
  }

  width = metadata.width || 800;
  height = isNaN(metadata.width / clientAspectRatio) ? 600 : Math.round(metadata.width / clientAspectRatio);

  const imagekit = new Imagekit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT,
  });

  const safeLeft = parsedTextOptions.left || 0;
  const safeTop = parsedTextOptions.top || 0;
  const safeCanvasHeight = parsedCanvasOptions.height || height;
  const safeFontSize = parsedTextOptions.fontSize || 16;
  
  const textLeftPosition = Math.round((safeLeft * width) / 375) || 0;
  const textTopPosition = Math.round((safeTop * height) / safeCanvasHeight) || 0;



  let croppingStrategy = "";

  if (parsedCanvasOptions.size !== "original") {
    if (originalAspectRatio > clientAspectRatio) {
      croppingStrategy = ",cm-pad_resize";
    }
  } else {
    if (
      originalOrientation === "landscape" &&
      parsedCanvasOptions.orientation === "portrait"
    ) {
      croppingStrategy = ",cm-pad_resize";
    }
  }

  const transformationString = `w-${width},h-${height}${croppingStrategy},bg-${parsedCanvasOptions.backgroundColor?.substring(1) || "ffffff"}${
    parsedTextOptions.text
      ? `,l-text,i-${parsedTextOptions.text},fs-${Math.round(safeFontSize * 2.1)},lx-${textLeftPosition},ly-${textTopPosition},co-${parsedTextOptions.color?.substring(1) || "000000"},l-end`
      : ""
  }`;

  imagekit
    .upload({
      file: media.data,
      fileName: media.name,
      folder: "test",
      transformation: {
        pre: transformationString,
      },
    })
    .then(async (response) => {

      let newBoardId;

      if (newBoard) {
        const res = await Board.create({
          title: newBoard,
          user: req.userId,
        });
        newBoardId = res._id;
      }

      const newPin = await Pin.create({
        user: req.userId,
        title,
        description,
        link: link || null,
        board: newBoardId || board || null,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        media: response.filePath,
        width: response.width,
        height: response.height,
      });
      return res.status(201).json(newPin);
    })
    .catch((err) => {

      return res.status(500).json(err);
    });
};

export const interactionCheck = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;

  const likeCount = await Like.countDocuments({ pin: id });

  if (!token) {
    return res.status(200).json({ likeCount, isLiked: false, isSaved: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res
        .status(200)
        .json({ likeCount, isLiked: false, isSaved: false });
    }

    const userId = payload.userId;

    const isLiked = await Like.findOne({
      user: userId,
      pin: id,
    });
    const isSaved = await Save.findOne({
      user: userId,
      pin: id,
    });

    return res.status(200).json({
      likeCount,
      isLiked: isLiked ? true : false,
      isSaved: isSaved ? true : false,
    });
  });
};

export const interact = async (req, res) => {
  const { id } = req.params;

  const { type } = req.body;

  if (type === "like") {
    const isLiked = await Like.findOne({
      pin: id,
      user: req.userId,
    });

    if (isLiked) {
      await Like.deleteOne({
        pin: id,
        user: req.userId,
      });
    } else {
      await Like.create({
        pin: id,
        user: req.userId,
      });
    }
  } else {
    const isSaved = await Save.findOne({
      pin: id,
      user: req.userId,
    });

    if (isSaved) {
      await Save.deleteOne({
        pin: id,
        user: req.userId,
      });
    } else {
      await Save.create({
        pin: id,
        user: req.userId,
      });
    }
  }

  return res.status(200).json({ message: "Successful" });
};
