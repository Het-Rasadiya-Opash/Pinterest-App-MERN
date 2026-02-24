import { Link } from "react-router";
import Image from "../image/image";

const PinCard = ({ pin }) => {
  const optimizedHeight = (372 * pin.height) / pin.width;

  if (!pin.media) return null;

  return (
    <Link
      to={`/pin/${pin._id}`}
      className="block break-inside-avoid mb-4 group relative cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          path={pin.media}
          alt={pin.title || "Pin"}
          w={372}
          h={optimizedHeight}
          className="w-full rounded-2xl object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      </div>

      <button className="hidden group-hover:block absolute top-4 right-4 bg-red-600 text-white rounded-3xl px-4 py-3 font-medium cursor-pointer transition-colors hover:bg-red-700 z-10">
        Save
      </button>
      <div className="hidden group-hover:flex absolute bottom-4 right-4 items-center gap-2 z-10">
        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-none cursor-pointer transition-colors hover:bg-gray-100">
          <Image path="/general/share.svg" alt="share" className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-none cursor-pointer transition-colors hover:bg-gray-100">
          <Image path="/general/more.svg" alt="more" className="w-5 h-5" />
        </button>
      </div>
    </Link>
  );
};

export default PinCard;
