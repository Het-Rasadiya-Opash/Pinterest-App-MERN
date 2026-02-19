import jwt from "jsonwebtoken";

export const tokenVerify = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      res.status(400).json({
        message: "token invalid",
      });
    }
    req.userId = payload.userId;
    next();
  });
};
