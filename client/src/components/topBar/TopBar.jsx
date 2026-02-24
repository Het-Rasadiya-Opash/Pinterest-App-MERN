import { useNavigate } from "react-router";
import Image from "../image/image";
import UserButton from "../userButton/userButton";

const TopBar = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?search=${e.target[0].value}`);
  };
  return (
    <div className="my-4 flex items-center gap-4 max-md:my-3 max-md:gap-3 max-sm:gap-2">
      <form onSubmit={handleSubmit} className="flex-1 bg-gray-100 rounded-2xl px-4 py-4 flex items-center gap-4 max-md:px-3 max-md:py-3 max-sm:px-2.5 max-sm:py-2.5">
        <Image path="/general/search.svg" alt="Search icon" />
        <input type="text" placeholder="Search" className="flex-1 bg-transparent border-none outline-none text-lg max-md:text-base max-sm:text-sm" />
      </form>
      <UserButton />
    </div>
  );
};

export default TopBar;
