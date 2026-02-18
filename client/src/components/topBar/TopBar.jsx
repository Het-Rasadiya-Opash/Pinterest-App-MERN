import React from "react";
import "./topBar.css";
import UserBotton from "../userBotton/UserBotton";
import Image from "../image/Image";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?search=${e.target[0].value}`);
  };
  return (
    <div className="topBar">
      <form onSubmit={handleSubmit} className="search">
        <Image path="/general/search.svg" alt="" />
        <input type="text" placeholder="Search" />
      </form>
      <UserBotton />
    </div>
  );
};

export default TopBar;
