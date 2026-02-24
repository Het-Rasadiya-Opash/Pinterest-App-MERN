import Image from "../image/image";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import { format } from "timeago.js";
import { Link } from "react-router";

const Boards = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full grid grid-cols-7 gap-4 max-[1746px]:grid-cols-6 max-[1509px]:grid-cols-5 max-[1272px]:grid-cols-4 max-[1035px]:grid-cols-3 max-[798px]:grid-cols-2 max-[798px]:gap-3 max-[475px]:grid-cols-1">
      {data?.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`}
          className="mb-8 cursor-pointer transition-transform hover:-translate-y-1 max-[798px]:mb-6"
          key={board._id}
        >
          <Image path={board.firstPin?.media || "/pins/pin1.jpeg"} alt={board.title || "Board cover"} className="w-full object-cover rounded-2xl" />
          <div className="flex flex-col gap-2 pt-2">
            <h1 className="font-medium text-base">{board.title}</h1>
            <span className="text-gray-500 text-sm">
              {board.pinCount} Pins · {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
