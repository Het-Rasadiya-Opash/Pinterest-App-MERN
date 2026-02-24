import { Link } from "react-router";
import Image from "../image/image";

const PinCard = ({ pin }) => {
  const optimizedHeight = (372 * pin.height) / pin.width;

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
    </Link>
  );
};

export default PinCard;
