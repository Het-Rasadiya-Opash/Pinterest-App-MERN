import React, { useState } from "react";
import "./comments.css";

import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ id }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => apiRequest.get(`/comments/${id}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "User not found!";
  return (
    <div className="comments">
      <div className="commentList">
        <span className="commentCount">
          {data.length === 0 ? "No Comments" : data.length} Comments
        </span>
        {data?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
      <CommentForm id={id} />
    </div>
  );
};

export default Comments;
