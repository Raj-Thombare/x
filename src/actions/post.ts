"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

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