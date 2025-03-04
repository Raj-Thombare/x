"use client";

import Link from "next/link";
import React from "react";
import Image from "./Image";
import { useUser } from "@clerk/nextjs";

const menuList = [
  {
    id: 1,
    name: "Homepage",
    link: "/",
    icon: "home.svg",
  },
  {
    id: 2,
    name: "Explore",
    link: "/",
    icon: "explore.svg",
  },
  {
    id: 3,
    name: "Notification",
    link: "/",
    icon: "notification.svg",
  },
  {
    id: 4,
    name: "Messages",
    link: "/",
    icon: "message.svg",
  },
  {
    id: 5,
    name: "Bookmarks",
    link: "/",
    icon: "bookmark.svg",
  },
  {
    id: 6,
    name: "Jobs",
    link: "/",
    icon: "job.svg",
  },
  {
    id: 7,
    name: "Communities",
    link: "/",
    icon: "community.svg",
  },
  {
    id: 8,
    name: "Premium",
    link: "/",
    icon: "logo.svg",
  },
  {
    id: 9,
    name: "Profile",
    link: "/",
    icon: "profile.svg",
  },
  {
    id: 10,
    name: "More",
    link: "/",
    icon: "more.svg",
  },
];

const LeftBar = () => {
  const { user } = useUser();
  return (
    <div className='h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8'>
      {/* LOGO MENU BUTTON */}
      <div className='flex flex-col gap-4 text-lg items-center xxl:items-start'>
        <Link href='/' className='p-2 rounded-full hover:bg-[#181818]'>
          <Image path='icons/logo.svg' alt='logo' w={24} h={24} />
        </Link>
        {/* MENU LIST */}
        <div className='flex flex-col'>
          {menuList.map((item) => {
            return (
              <Link
                href={item.link}
                key={item.id}
                className='p-2 rounded-full hover:bg-[#181818] flex items-center gap-4'>
                <Image
                  path={`icons/${item.icon}`}
                  alt={item.name}
                  h={24}
                  w={24}
                />
                <span className='hidden xxl:inline'>{item.name}</span>
              </Link>
            );
          })}
        </div>
        <Link
          href='/compose/post'
          className='bg-white text-black rounded-full font-bold w-12 h-12 flex items-center justify-center xxl:hidden'>
          <Image path='icons/post.svg' alt='new post' w={24} h={24} />
        </Link>
        <Link
          href='/compose/post'
          className='hidden xxl:block bg-white text-black rounded-full font-bold py-2 px-20'>
          Post
        </Link>
      </div>
      {/* USER */}
      {user && (
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-10 h-10 relative rounded-full overflow-hidden'>
              <Image
                src={user?.imageUrl}
                alt={user?.username || ""}
                tr={true}
                w={100}
                h={100}
              />
            </div>
            <div className='hidden xxl:flex flex-col'>
              <span className='font-bold'>Raj Thombare</span>
              <span className='text-sm text-textGray'>@RajTh0mbare</span>
            </div>
          </div>
          <div className='hidden xxl:block cursor-pointer font-bold'>...</div>
        </div>
      )}
    </div>
  );
};

export default LeftBar;
