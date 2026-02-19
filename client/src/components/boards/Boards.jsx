import React from "react";
import Image from "../image/Image";
import "./boards.css";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import { Link, useParams } from "react-router-dom";
import { format } from "timeago.js";

const Boards = ({ userId }) => {
  const { username } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["boards", username],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "User not found!";
  return (
    <div className="collections">
      {data?.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`}
          className="collection"
          key={board._id}
        >
          <Image src={board.firstPin.media || "/pins/pin1.jpeg"} />
          <div className="collectionInfo">
            <h1>{board.title}</h1>
            <span>
              {board.pinCount} Pins - {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
