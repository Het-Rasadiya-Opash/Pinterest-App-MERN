import GalleryItem from "../galleryItem/galleryItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Skeleton from "../skeleton/skeleton";

const fetchPins = async ({ pageParam, search, userId, boardId, saved }) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/pins?cursor=${pageParam}&search=${
      search || ""
    }&userId=${userId || ""}&boardId=${boardId || ""}&saved=${saved || ""}`
  );
  return res.data;
};

const Gallery = ({ search, userId, boardId, saved }) => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["pins", search, userId, boardId, saved],
    queryFn: ({ pageParam = 0 }) =>
      fetchPins({ pageParam, search, userId, boardId, saved }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  if (status === "pending") return <Skeleton/>;
  if (status === "error") return "Something went wrong...";

  const allPins = data?.pages.flatMap((page) => page.pins) || [];

  if (allPins.length === 0) {
    return <div className="flex items-center justify-center"><h3 className="text-gray-600 font-semibold">{saved ? "No saved pins yet" : userId ? "No pins yet" : "No pins found"}</h3></div>;
  }

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more pins</h4>}
      endMessage={<h3 className="text-center text-gray-600 font-semibold py-8">All pins Loaded</h3>}
    >
      <div className="grid grid-cols-7 gap-4 auto-rows-[10px] max-[1746px]:grid-cols-6 max-[1509px]:grid-cols-5 max-[1272px]:grid-cols-4 max-[1035px]:grid-cols-3 max-[798px]:grid-cols-2 max-[475px]:grid-cols-1">
        {allPins?.map((item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;
