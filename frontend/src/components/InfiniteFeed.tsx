"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";

const fetchPosts = async (pageParam: number, userProfileId?: string) => {
  const res = await fetch(
    "api/posts?cursor=" + pageParam + "&user=" + userProfileId
  );
  return res.json();
};

const InfiniteFeed = ({ userProfileId }: { userProfileId?: string }) => {
  const { data, status, error, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 2 }) => fetchPosts(pageParam, userProfileId),
    initialPageParam: 2,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 2 : undefined,
  });

  if (error) return "Something went wrong!";
  if (status === "pending") return "Loading...";

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];
  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      hasMore={!!hasNextPage}
      next={fetchNextPage}
      loader={<h1 className='text-center'>Posts are loading...</h1>}
      endMessage={<h1 className='text-center'>All posts loaded!</h1>}>
      {allPosts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </InfiniteScroll>
  );
};

export default InfiniteFeed;
