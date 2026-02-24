import Image from "../../components/image/image";
import { useState } from "react";
import Gallery from "../../components/gallery/gallery";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import apiRequest from "../../utils/apiRequest";
import Boards from "../../components/boards/boards";
import FollowButton from "./FollowButton";
import useAuthStore from "../../utils/authStore";

const ProfilePage = () => {
  const [type, setType] = useState("created");
  const { currentUser } = useAuthStore();
  const { username } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  if (!data) return "User not found!";

  const isOwnProfile = currentUser?._id === data._id;

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <Image
        className="rounded-full object-cover w-[120px] h-[120px]"
        w={120}
        h={120}
        path={data.img || "/general/noAvatar.png"}
        alt=""
      />

      <h1 className="text-4xl font-medium">{data.displayName}</h1>
      <span className="font-light text-gray-500">@{data.username}</span>

      <div className="font-medium">
        {data.followerCount} followers · {data.followingCount} followings
      </div>

      <div className="flex items-center gap-8 flex-wrap justify-center">
        <Image path="/general/share.svg" alt="" />

        <div className="flex gap-4">
          <button className="border-none px-4 py-4 rounded-full font-bold cursor-pointer">
            Message
          </button>

          <FollowButton
            isFollowing={data.isFollowing}
            username={data.username}
          />
        </div>

        <Image path="/general/more.svg" alt="" />
      </div>

      {/* TABS */}
      <div className="flex gap-6 mt-8 mb-4 font-medium">
        <span
          onClick={() => setType("created")}
          className={`cursor-pointer py-2 ${
            type === "created" ? "border-b-[3px] border-black" : ""
          }`}
        >
          Created
        </span>

        {isOwnProfile && (
          <span
            onClick={() => setType("saved")}
            className={`cursor-pointer py-2 ${
              type === "saved" ? "border-b-[3px] border-black" : ""
            }`}
          >
            Saved
          </span>
        )}

        <span
          onClick={() => setType("boards")}
          className={`cursor-pointer py-2 ${
            type === "boards" ? "border-b-[3px] border-black" : ""
          }`}
        >
          Boards
        </span>
      </div>

      {/* CONTENT */}
      {type === "created" && <Gallery userId={data._id} />}
      {type === "saved" && isOwnProfile && <Gallery saved />}
      {type === "boards" && <Boards userId={data._id} />}
    </div>
  );
};

export default ProfilePage;
