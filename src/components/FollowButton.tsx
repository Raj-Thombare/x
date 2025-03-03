"use client";

import React from "react";

const FollowButton = ({
  isFollowed,
}: {
  userId: string;
  isFollowed: boolean;
}) => {
  return (
    <button
      className={` ${
        isFollowed
          ? "text-white bg-black border-[1px] border-gray-500"
          : "bg-white text-black"
      } py-2 px-4  font-bold rounded-full`}>
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
