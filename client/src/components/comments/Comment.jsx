import React from "react";
import Image from "../image/Image";
import "./comments.css";
import { format } from "timeago.js";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <Image src={comment.user.img || "/general/noAvatar.png"} />
      <div className="commentContent">
        <span className="commentUsername">{comment.user.displayName}</span>
        <p className="commentText">{comment.description}</p>
        <span className="commentTime">{format(comment.createdAt)}</span>
      </div>
    </div>
  );
};

export default Comment;
