import React from "react";
import Gallery from "../../components/gallery/Gallery";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  let [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const boardId = searchParams.get("boardId");

  return (
    <div>
      <Gallery search={search} boardId={boardId} />
    </div>
  );
};

export default SearchPage;
