import Image from "../../components/image/image";
import PostInteractions from "../../components/postInteractions/postInteractions";
import { Link, useParams } from "react-router";
import Comments from "../../components/comments/comments";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";

const PostPage = () => {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => apiRequest.get(`/pins/${id}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "Pin not found!";

  return (
    <div className="flex justify-center gap-8 p-4 max-sm:p-2">
      <div className="w-[70%] max-h-205 flex border border-gray-200 rounded-4xl overflow-hidden shadow-lg max-[1127px]:w-full max-[751px]:flex-col max-[751px]:max-h-none max-sm:rounded-2xl">
        <div className="flex-1 bg-[#c8bcaf] flex items-center justify-center min-h-100 max-[751px]:min-h-75">
          <Image path={data.media} alt={data.title || "Pin image"} w={736} className="w-full h-full object-contain " />
        </div>
        <div className="w-100 h-full flex flex-col gap-6 p-6 overflow-hidden max-[751px]:w-full max-sm:p-4 max-sm:gap-4">
          <PostInteractions postId={id}/>
          <Link to={`/${data.user.username}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image path={data.user.img || "/general/noAvatar.png"} className="w-10 h-10 rounded-full object-cover" alt="User avatar" />
            <span className="font-medium">{data.user.displayName}</span>
          </Link>
          <Comments id={data._id}/>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
