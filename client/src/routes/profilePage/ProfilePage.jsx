import Image from "../../components/image/image";
import { useState } from "react";
import Gallery from "../../components/gallery/gallery";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import apiRequest from "../../utils/apiRequest";
import Boards from "../../components/boards/boards";
import FollowButton from "./FollowButton";

const ProfilePage = () => {
  const [type, setType] = useState("created");

  const { username } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "User not found!";

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <Image
        className="rounded-full object-cover w-[120px] h-[120px] max-md:w-[100px] max-md:h-[100px] max-sm:w-20 max-sm:h-20"
        w={120}
        h={120}
        path={data.img || "/general/noAvatar.png"}
        alt=""
      />
      <h1 className="text-4xl font-medium max-md:text-3xl max-sm:text-2xl">{data.displayName}</h1>
      <span className="font-light text-gray-500">@{data.username}</span>
      <div className="font-medium max-sm:text-sm">
        {data.followerCount} followers · {data.followingCount} followings
      </div>
      <div className="flex items-center gap-8 flex-wrap justify-center max-md:gap-4 max-sm:gap-3">
        <Image path="/general/share.svg" alt="" />
        <div className="flex gap-4 max-md:gap-3 max-sm:flex-col max-sm:w-full">
          <button className="border-none px-4 py-4 rounded-full font-bold cursor-pointer transition-colors max-md:px-4 max-md:py-3 max-md:text-sm max-sm:w-full">Message</button>
          <FollowButton
            isFollowing={data.isFollowing}
            username={data.username}
          />
        </div>
        <Image path="/general/more.svg" alt="" />
      </div>
      <div className="flex gap-4 mt-8 mb-4 font-medium">
        <span
          onClick={() => setType("created")}
          className={`cursor-pointer py-2 transition-colors hover:text-gray-500 ${type === "created" ? "border-b-[3px] border-black" : ""}`}
        >
          Created
        </span>
        <span
          onClick={() => setType("saved")}
          className={`cursor-pointer py-2 transition-colors hover:text-gray-500 ${type === "saved" ? "border-b-[3px] border-black" : ""}`}
        >
          Saved
        </span>
      </div>
      {type === "created" && <Gallery userId={data._id} />}
      {type === "saved" && <Gallery saved={true} />}
    </div>
  );
};

export default ProfilePage;
