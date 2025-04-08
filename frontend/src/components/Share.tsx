"use client";

import React, { useActionState, useEffect, useRef, useState } from "react";
import Image from "./Image";
import NextImage from "next/image";
import ImageEditor from "./ImageEditor";
import { useUser } from "@clerk/nextjs";
import { addPost } from "@/actions/actions";

const Share = () => {
  const { user } = useUser();
  const [media, setMedia] = useState<File | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<{
    type: "original" | "wide" | "square";
    sensitive: boolean;
  }>({
    type: "original",
    sensitive: false,
  });

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const previewURL = media ? URL.createObjectURL(media) : null;

  const [state, formAction, isPending] = useActionState(addPost, {
    success: false,
    error: false,
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      className='p-4 flex gap-4'
      action={formAction}
      // action={(formData) => shareAction(formData, settings)}
    >
      {/* AVATAR */}
      {user && (
        <div className='relative w-10 h-10 rounded-full overflow-hidden'>
          <Image
            src={user?.imageUrl}
            alt={user?.username || ""}
            w={100}
            h={100}
            tr={true}
          />
        </div>
      )}
      {/* OTHERS */}
      <div className='flex flex-1 flex-col gap-4'>
        <input
          type='text'
          name='imgType'
          value={settings.type}
          hidden
          readOnly
        />
        <input
          type='text'
          name='isSensitive'
          value={settings.sensitive ? "true" : "false"}
          hidden
          readOnly
        />
        <input
          type='text'
          name='desc'
          placeholder='What is happening?!'
          className='bg-transparent outline-none placeholder:text-textGray text-xl'
        />
        {/* PREVIEW IMAGE */}
        {media?.type.includes("image") && previewURL && (
          <div className='relative rounded-xl overflow-hidden'>
            <NextImage src={previewURL} alt='' width={600} height={600} />
            <div
              onClick={() => setIsEditorOpen(true)}
              className='absolute top-2 left-2 bg-black text-white px-4 py-1 rounded-full font-bold text-sm cursor-pointer'>
              Edit
            </div>
            <div
              className='absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm'
              onClick={() => setMedia(null)}>
              X
            </div>
          </div>
        )}
        {media?.type?.includes("video") && previewURL && (
          <div className='relative'>
            <video src={previewURL} />
            <div
              className='absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm'
              onClick={() => setMedia(null)}>
              X
            </div>
          </div>
        )}
        {isEditorOpen && previewURL && (
          <ImageEditor
            onClose={() => setIsEditorOpen(false)}
            previewURL={previewURL}
            settings={settings}
            setSettings={setSettings}
          />
        )}
        <div className='flex items-center justify-between gap-4 flex-wrap'>
          <div className='flex gap-4 flex-wrap'>
            <input
              type='file'
              className='hidden'
              id='file'
              name='file'
              onChange={handleMediaChange}
              accept='image/*,video/*'
            />
            <label htmlFor='file'>
              <Image
                path='icons/image.svg'
                alt=''
                w={20}
                h={20}
                className='cursor-pointer'
              />
            </label>
            <Image
              path='icons/gif.svg'
              alt=''
              w={20}
              h={20}
              className='cursor-pointer'
            />
            <Image
              path='icons/poll.svg'
              alt=''
              w={20}
              h={20}
              className='cursor-pointer'
            />
            <Image
              path='icons/emoji.svg'
              alt=''
              w={20}
              h={20}
              className='cursor-pointer'
            />
            <Image
              path='icons/schedule.svg'
              alt=''
              w={20}
              h={20}
              className='cursor-pointer'
            />
            <Image
              path='icons/location.svg'
              alt=''
              w={20}
              h={20}
              className='cursor-pointer'
            />
          </div>
          <button
            type='submit'
            className='bg-white text-black font-bold rounded-full py-2 px-4 disabled:cursor-not-allowed'
            disabled={isPending}>
            {isPending ? "Posting" : "Post"}
          </button>
          {state.error && (
            <span className='text-red-300'>Something went wrong</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default Share;
