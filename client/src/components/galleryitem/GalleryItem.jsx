import { Link } from "react-router";
import Image from "../image/image";

const GalleryItem = ({ item }) => {

const optimizedHeight = (372 * item.height) / item.width

  return (
    <div
      className="flex relative cursor-pointer group"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <Image path={item.media} alt="" w={372} h={optimizedHeight} className="w-full rounded-2xl object-cover transition-transform group-hover:scale-[1.02] max-md:rounded-xl"/>
      <Link to={`/pin/${item._id}`} className="hidden group-hover:block absolute w-full h-full top-0 left-0 bg-black/30 rounded-2xl max-md:rounded-xl" />
    </div>
  );
};

export default GalleryItem;
