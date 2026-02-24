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
      <button className=" group-hover:block absolute top-4 right-4 bg-red-600 text-white rounded-3xl px-4 py-3 font-medium cursor-pointer transition-colors hover:bg-red-700">
        Save
      </button>
      <div className=" group-hover:flex absolute bottom-4 right-4 items-center gap-2">
        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-none cursor-pointer transition-colors hover:bg-gray-100">
          <Image path="/general/share.svg" alt="" className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-none cursor-pointer transition-colors hover:bg-gray-100">
          <Image path="/general/more.svg" alt="" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
