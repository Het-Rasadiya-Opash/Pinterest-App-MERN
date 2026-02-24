import Image from "../image/image";
import {Link} from "react-router";

const LeftBar = () => {
  return (
    <div className="flex flex-col items-center justify-between w-18 h-screen sticky top-0 py-4 border-r border-gray-200 max-md:w-15 max-md:py-3 max-sm:hidden">
      <div className="flex flex-col items-center gap-6 max-md:gap-4">
        <Link to="/" className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors max-md:w-10 max-md:h-10">
          <Image path="/general/h.png" alt="" className="w-6 h-6"/>
        </Link>
        <Link to="/" className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer max-md:w-10 max-md:h-10">
          <Image path="/general/home.svg" alt="" />
        </Link>
        <Link to="/create" className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer max-md:w-10 max-md:h-10">
          <Image path="/general/create.svg" alt="" />
        </Link>
       
      </div>
   
    </div>
  );
};

export default LeftBar;
