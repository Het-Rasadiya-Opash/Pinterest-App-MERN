import React from "react";
import Gallery from "../../components/gallery/Gallery";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  let [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  return (
    <div>
      <Gallery search={search} />
    </div>
  );
};

export default SearchPage;
