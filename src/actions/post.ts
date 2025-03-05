"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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