import React from "react";
import Post from "./Post";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import InfiniteFeed from "./InfiniteFeed";

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
  const { userId } = await auth();

  if (!userId) return;

  const whereCondition = userProfileId
    ? { parentPostId: null, userId: userProfileId }
    : {
        parentPostId: null,
        userId: {
          in: [
            userId,
            ...(
              await prisma.follow.findMany({
                where: {
                  followerId: userId,
                },
                select: {
                  followingId: true,
                },
              })
            ).map((follow) => follow.followingId),
          ],
        },
      };

  const postIncludeQuery = {
    user: {
      select: {
        displayName: true,
        username: true,
        img: true,
      },
    },
    _count: {
      select: {
        likes: true,
        reposts: true,
        comments: true,
      },
    },
    likes: {
      where: {
        userId: userId,
      },
      select: {
        id: true,
      },
    },
    reposts: {
      where: {
        userId: userId,
      },
      select: {
        id: true,
      },
    },
    saves: {
      where: {
        userId: userId,
      },
      select: {
        id: true,
      },
    },
  };

  const posts = await prisma.post.findMany({
    where: whereCondition,
    include: {
      repost: {
        include: postIncludeQuery,
      },
      ...postIncludeQuery,
    },
    take: 3,
    skip: 0,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Post post={post} />
          </div>
        );
      })}
      <InfiniteFeed userProfileId={userProfileId} />
    </div>
  );
};

export default Feed;
