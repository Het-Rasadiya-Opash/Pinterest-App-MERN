import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import userRouter from "./routes/user.route.js";
import pinRouter from "./routes/pin.route.js";
import commentRouter from "./routes/comment.route.js";
import boardRouter from "./routes/board.route.js";
import connectDB from "./utils/connectDB.js";
import cors from "cors";

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/pins", pinRouter);
app.use("/comments", commentRouter);
app.use("/boards", boardRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is Running on ${process.env.PORT}`);
});
