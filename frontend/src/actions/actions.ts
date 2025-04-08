"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { imagekit } from "../../utils";
import { UploadResponse } from "imagekit/dist/libs/interfaces";

export const followUser = async (targetUserId: string) => {
    const { userId } = await auth();

    if (!userId) return

    const existingFollow = await prisma.follow.findFirst({
        where: {
            followerId: userId,
            followingId: targetUserId
        }
    })

    if (existingFollow) {
        await prisma.follow.delete({
            where: {
                id: existingFollow.id
            }
        })
    } else {
        await prisma.follow.create({
            data: {
                followerId: userId,
                followingId: targetUserId
            }
        })
    }
}

export const likePost = async (postId: number) => {
    const { userId } = await auth();

    if (!userId) return

    const existingLike = await prisma.like.findFirst({
        where: {
            postId: postId,
            userId: userId
        }
    })

    if (existingLike) {
        await prisma.like.delete({
            where: {
                id: existingLike.id
            }
        })
    } else {
        await prisma.like.create({
            data: {
                postId,
                userId
            }
        })
    }
}

export const rePost = async (postId: number) => {
    const { userId } = await auth();

    if (!userId) return

    const existingRepost = await prisma.post.findFirst({
        where: {
            repostId: postId,
            userId: userId
        }
    })

    if (existingRepost) {
        await prisma.post.delete({
            where: {
                id: existingRepost.id
            }
        })
    } else {
        await prisma.post.create({
            data: {
                repostId: postId,
                userId
            }
        })
    }
}

export const savePost = async (postId: number) => {
    const { userId } = await auth();

    if (!userId) return

    const existingSave = await prisma.savedPosts.findFirst({
        where: {
            postId: postId,
            userId: userId
        }
    })

    if (existingSave) {
        await prisma.savedPosts.delete({
            where: {
                id: existingSave.id
            }
        })
    } else {
        await prisma.savedPosts.create({
            data: {
                postId,
                userId
            }
        })
    }
}

export const addComment = async (prevState: { success: boolean, error: boolean }, formData: FormData) => {
    const { userId } = await auth();

    if (!userId) return { success: false, error: true }

    const desc = formData.get('desc')
    const postId = formData.get('postId')
    const username = formData.get('username')

    const Comment = z.object({
        parentPostId: z.number(),
        desc: z.string().max(140)
    })

    const validatedFields = Comment.safeParse({
        parentPostId: Number(postId),
        desc,
    })

    if (!validatedFields.success) {
        return { success: false, error: true }
    }

    try {
        await prisma.post.create({
            data: {
                ...validatedFields.data,
                userId
            }
        })
        revalidatePath(`/${username}/status/${postId}`)
        return { success: true, error: false }

    } catch (err) {
        console.log(err)
        return { success: false, error: true }

    }
}

export const addPost = async (prevState: { success: boolean, error: boolean }, formData: FormData) => {
    const { userId } = await auth();

    if (!userId) return { success: false, error: true }

    const desc = formData.get('desc')
    const imgType = formData.get('imgType')
    const file = formData.get('file') as File
    const isSensitive = formData.get('isSensitive') as string

    const uploadFile = async (file: File): Promise<UploadResponse> => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const transformation = `w-600,${imgType === "square" ? "ar-1-1" : imgType === "wide" ? "ar-16-9" : ""
            }`;
        return new Promise((resolve, reject) => {
            imagekit.upload(
                {
                    file: buffer,
                    fileName: file.name,
                    folder: "/posts",
                    ...(file.type.includes("image") && {
                        transformation: {
                            pre: transformation
                        },
                    }),
                },
                function (error, result) {
                    if (error) reject(error);
                    else resolve(result as UploadResponse);
                }
            );
        })
    }

    const Post = z.object({
        isSensitive: z.boolean().optional(),
        desc: z.string().max(140)
    })

    const validatedFields = Post.safeParse({
        isSensitive: JSON.parse(isSensitive),
        desc,
    })

    if (!validatedFields.success) {
        return { success: false, error: true }
    }

    let img = ""
    let video = ""
    let imgHeight = 0

    if (file.size) {
        const result: UploadResponse = await uploadFile(file)

        if (result.fileType === "image") {
            img = result.filePath
            imgHeight = result.height
        } else {
            video = result.filePath
        }
    }

    try {
        await prisma.post.create({
            data: {
                ...validatedFields.data,
                userId,
                img,
                imgHeight,
                video
            }
        })
        revalidatePath(`/`)
        return { success: true, error: false }

    } catch (err) {
        console.log(err)
        return { success: false, error: true }

    }
}