import { useState, useRef, useEffect } from "react";
import Image from "../image/image";
import apiRequest from "../../utils/apiRequest";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore";

const UserButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, removeCurrentUser } = useAuthStore();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/users/auth/logout", {});
      removeCurrentUser();
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  return currentUser ? (
    <div className="flex items-center gap-4 relative max-sm:hidden" ref={dropdownRef}>
      <Image path={currentUser.img || "/general/noAvatar.png"} alt="" className="w-9 h-9 rounded-full object-cover" />
      <div onClick={() => setOpen((prev) => !prev)}>
        <Image path="/general/arrow.svg" alt="" className="cursor-pointer w-4 h-4" />
      </div>
      {open && (
        <div className="absolute right-0 top-[120%] p-4 rounded-lg bg-white z-999 flex flex-col text-sm shadow-md">
          <Link to={`/${currentUser.username}`} className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 hover:text-gray-500">
            Profile
          </Link>
          <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 hover:text-gray-500" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link to="/auth" className="text-lg px-4 py-4 rounded-full hover:bg-gray-100">
      Login / Sign Up
    </Link>
  );
};

export default UserButton;
