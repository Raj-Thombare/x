import React from "react";
import Post from "./Post";
import { prisma } from "@/lib/prisma";

const Feed = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Post />
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
