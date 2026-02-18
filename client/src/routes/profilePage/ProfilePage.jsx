import { useState } from "react";
import React from "react";
import Image from "../../components/image/Image";
import "./profilePage.css";
import Collections from "../../components/collections/Collections";
import Gallery from "../../components/gallery/Gallery";

const ProfilePage = () => {
  const [type, setTyped] = useState("");
  return (
    <div className="profilePage">
      <Image path="/general/noAvatar.png" />
      <h1 className="profileName">John</h1>
      <span className="profileUsernameD">@john</span>
      <div className="followCounts">10 followers - 20 Following</div>
      <div className="profileInteractions">
        <Image path="/general/share.svg" />
        <div className="profileButtons">
          <button>Message</button>
          <button>Follow</button>
        </div>
        <Image path="/general/more.svg" />
      </div>
      <div className="profileOptions">
        <span
          onClick={() => setTyped("created")}
          className={type === "created" ? "active" : ""}
        >
          Created
        </span>
        <span
          onClick={() => setTyped("saved")}
          className={type === "saved" ? "active" : ""}
        >
          Saved
        </span>
      </div>
      {type === "created" ? <Gallery /> : <Collections />}
    </div>
  );
};

export default ProfilePage;
