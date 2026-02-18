import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./userBotton.css";
import Image from "../image/Image";

const UserBotton = () => {
  const currentUser = true;
  const [open, setOpen] = useState(false);

  return currentUser ? (
    <div className="userButton">
      <Image path="/general/noAvatar.png" alt="" />
      <Image
        onClick={() => setOpen((prev) => !prev)}
        path="/general/arrow.svg"
        alt=""
        className="arrow"
      />

      {open && (
        <div className="userOptions">
          <div className="userOption">Profile</div>
          <div className="userOption">Setting</div>
          <div className="userOption">Logout</div>
        </div>
      )}
    </div>
  ) : (
    <Link to="/login" className="loginLink">
      Login / Sign Up
    </Link>
  );
};

export default UserBotton;
