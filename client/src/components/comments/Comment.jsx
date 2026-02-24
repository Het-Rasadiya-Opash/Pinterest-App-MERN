import Image from "../image/image";
import {format} from "timeago.js" 

const Comment = ({ comment }) => {
  return (
    <div className="flex gap-4 max-md:gap-3">
      <Image path={comment.user.img || "/general/noAvatar.png"} alt="Commenter avatar" className="w-8 h-8 rounded-full object-cover max-md:w-7 max-md:h-7" />
      <div className="flex flex-col gap-1 flex-1">
        <span className="font-medium text-sm">{comment.user.displayName}</span>
        <p className="text-sm wrap-break-word">
          {comment.description}
        </p>
        <span className="text-xs text-gray-400">{format(comment.createdAt)}</span>
      </div>
    </div>
  );
};

export default Comment;
