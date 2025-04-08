import React from "react";
import Image from "./Image";
import Link from "next/link";

const PopularTags = () => {
  return (
    <div className='p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4'>
      <h1 className='text-xl font-bold text-textGrayLight'>
        What&apos;s Happening?
      </h1>
      {/* TRENDS */}
      <div className='flex gap-4'>
        <div className='relative w-20 h-20 rounded-xl overflow-hidden'>
          <Image
            path='general/event.jpeg'
            alt='event'
            w={120}
            h={120}
            tr={true}
          />
        </div>
        <div className='flex-1'>
          <h2 className='font-bold text-textGrayLight'>
            Champions Trophy 2025
          </h2>
          <span className='text-sm text-textGray'>Last Night</span>
        </div>
      </div>
      {/* TOPICS */}
      <div className=''>
        <div className='flex items-center justify-between'>
          <span className='text-textGray text-sm'>
            Entertainment • Trending in India
          </span>
          <Image path='icons/infoMore.svg' alt='info' w={16} h={16} />
        </div>
        <h2 className='text-textGrayLight font-bold'>
          India&apos;s Got Latent
        </h2>
        <span className='text-textGray text-sm'>1M posts</span>
      </div>
      {/* TOPICS */}
      <div className=''>
        <div className='flex items-center justify-between'>
          <span className='text-textGray text-sm'>Technology • Trending</span>
          <Image path='icons/infoMore.svg' alt='info' w={16} h={16} />
        </div>
        <h2 className='text-textGrayLight font-bold'>OpenAI</h2>
        <span className='text-textGray text-sm'>20K posts</span>
      </div>
      {/* TOPICS */}
      <div className=''>
        <div className='flex items-center justify-between'>
          <span className='text-textGray text-sm'>Politics • Trending</span>
          <Image path='icons/infoMore.svg' alt='info' w={16} h={16} />
        </div>
        <h2 className='text-textGrayLight font-bold'>Amit Shah</h2>
        <span className='text-textGray text-sm'>5,069 posts</span>
      </div>
      {/* TOPICS */}
      <div className=''>
        <div className='flex items-center justify-between'>
          <span className='text-textGray text-sm'>Travel • Trending</span>
          <Image path='icons/infoMore.svg' alt='info' w={16} h={16} />
        </div>
        <h2 className='text-textGrayLight font-bold'>Sydney</h2>
        <span className='text-textGray text-sm'>10K posts</span>
      </div>
      <Link href='/' className='text-iconBlue'>
        Show More
      </Link>
    </div>
  );
};

export default PopularTags;
