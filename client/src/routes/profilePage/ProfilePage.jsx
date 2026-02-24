import { useState } from "react";
import React from "react";
import Image from "../../components/image/Image";
import "./profilePage.css";
import Gallery from "../../components/gallery/Gallery";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";
import Boards from "../../components/boards/Boards";
import FollowButton from "./FollowButton";

const ProfilePage = () => {
  const [type, setTyped] = useState("created");
  const { username } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "User not found!";
  return (
    <div className="profilePage">
      <Image src={data.img || "/general/noAvatar.png"} />
      <h1 className="profileName">{data.displayName}</h1>
      <span className="profileUsernameD">{data.username}</span>
      <div className="followCounts">
        {data.followerCount} Followers - {data.followingCount} Followings
      </div>
      <div className="profileInteractions">
        <Image path="/general/share.svg" />
        <div className="profileButtons">
          <button>Message</button>
          <FollowButton
            isFollowing={data.isFollowing}
            username={data.username}
          />
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
      {type === "created" && <Gallery userId={data._id} />}
      {type === "saved" && <Gallery saved={true} userId={data._id} />}
    </div>
  );
};

export default ProfilePage;
