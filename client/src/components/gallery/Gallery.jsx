import axios from "axios";
import React from "react";
import "./gallery.css";
import GalleryItem from "../galleryitem/GalleryItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPins = async ({ pageParam, search, userId, boardId, saved }) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/pins?cursor=${pageParam}&search=${search || ""}&userId=${userId || ""}&boardId=${boardId || ""}&saved=${saved || ""}`,
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

  if (status === "pending") return "Loading...";
  if (status === "error") return "Error occured";

  const allPins = data?.pages.flatMap((page) => page.pins) || [];

  if (allPins.length === 0) {
    return <div className="flex items-center justify-center"><h3 className="text-gray-600 font-semibold">{userId ? "No pins yet" : "No pins found"}</h3></div>;
  }

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={<h3 className="text-center text-gray-600 font-semibold py-8">All pins Loaded</h3>}
    >
      <div className="gallery">
        {allPins?.map((item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;
