"use client";

import { followUser } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useOptimistic, useState } from "react";

const FollowButton = ({
  userId,
  isFollowed,
}: {
  userId: string;
  isFollowed: boolean;
}) => {
  const [state, setState] = useState(isFollowed);

  const { user } = useUser();

  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
    state,
    (prev) => !prev
  );

  if (!user) return;

  const followAction = async () => {
    switchOptimisticFollow("");
    await followUser(userId);
    setState((prev) => !prev);
  };

  return (
    <form action={followAction}>
      <button
        className={` ${
          isFollowed
            ? "text-white bg-black border-[1px] border-gray-500"
            : "bg-white text-black"
        } py-2 px-4  font-bold rounded-full`}>
        {optimisticFollow ? "Unfollow" : "Follow"}
      </button>
    </form>
  );
};

export default FollowButton;