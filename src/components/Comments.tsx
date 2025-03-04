"use client";

import { useUser } from "@clerk/nextjs";
import Image from "./Image";
import Post from "./Post";
import { Post as PostType } from "@prisma/client";

type CommentWithDetails = PostType & {
  user: { displayName: string | null; username: string; img: string | null };
  _count: { likes: number; reposts: number; comments: number };
  likes: { id: number }[];
  reposts: { id: number }[];
  saves: { id: number }[];
};

const Comments = ({
  comments,
}: {
  comments: CommentWithDetails[];
  postId: number;
  username: string;
}) => {
  const { user } = useUser();

  return (
    <div className=''>
      {user && (
        <form className='flex items-center justify-between gap-4 p-4 '>
          <div className='relative w-10 h-10 rounded-full overflow-hidden'>
            <Image
              src={user?.imageUrl}
              alt={user?.username || ""}
              w={100}
              h={100}
              tr={true}
            />
          </div>
          <input
            type='text'
            className='flex-1 bg-transparent outline-none p-2 text-xl'
            placeholder='Post your reply'
          />
          <button className='py-2 px-4 font-bold bg-white text-black rounded-full'>
            Reply
          </button>
        </form>
      )}
      {comments.map((comment) => (
        <div key={comment.id}>
          <Post post={comment} type='comment' />
        </div>
      ))}
    </div>
  );
};

export default Comments;
