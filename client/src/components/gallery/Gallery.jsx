import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import PinCard from "../pinCard/pinCard";

const Gallery = ({ userId, saved,search,boardId }) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["pins", userId, saved, search, boardId],
    queryFn: () =>
      apiRequest
        .get("/pins", {
          params: {
            userId: userId || undefined,
            saved: saved ? "true" : "false",
            search: search || "",
            boardId: boardId || "",
          },
        })
        .then((res) => res.data),
  });

  if (isPending) return "Loading pins...";
  if (error) return "Something went wrong!";

  if (!data?.pins?.length) return "No pins found.";

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {data.pins.map((pin) => (
        <PinCard key={pin._id} pin={pin} />
      ))}
    </div>
  );
};

export default Gallery;
