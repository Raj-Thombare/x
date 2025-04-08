import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;

    const userProfileId = searchParams.get("user");

    const page = searchParams.get("cursor");

    const LIMIT = 3;

    const { userId } = await auth();

    if (!userId) return;

    const whereCondition = userProfileId !== "undefined"
        ? { parentPostId: null, userId: userProfileId as string }
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
        include: {
            repost: {
                include: postIncludeQuery,
            },
            ...postIncludeQuery
        },
        where: whereCondition,
        take: LIMIT,
        skip: (Number(page) - 1) * LIMIT
    });

    const totalPosts = await prisma.post.count({
        where: whereCondition
    })

    const hasMore = Number(page) * LIMIT < totalPosts;

    // await new Promise((resolve) => setTimeout(resolve, 3000))
    return Response.json({ posts, hasMore })

}
