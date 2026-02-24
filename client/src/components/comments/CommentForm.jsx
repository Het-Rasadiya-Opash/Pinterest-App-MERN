import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addComment = async (comment) => {
  const res = await apiRequest.post("/comments", comment);
  return res.data;
};

const CommentForm = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");

  const handleEmojiClick = (emoji) => {
    setDesc((prev) => prev + " " + emoji.emoji);
    setOpen(false);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setDesc("");
      setOpen(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({
      description: desc,
      pin: id,
    });
  };

  return (
    <form
      className="bg-gray-100 px-4 py-3.5 rounded-full flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow max-md:px-3 max-md:py-3"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Add a comment"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
        className="flex-1 border-none outline-none bg-transparent text-base placeholder:text-gray-400"
      />
      <div className="cursor-pointer text-xl relative transition-transform hover:scale-110 select-none">
        <div onClick={() => setOpen((prev) => !prev)}>😊</div>
        {open && (
          <div className="absolute right-0 bottom-12 z-100 max-sm:-right-4">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={320}
              height={400}
              previewConfig={{ showPreview: false }}
              skinTonesDisabled
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
