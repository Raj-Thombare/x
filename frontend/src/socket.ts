"use client";

import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
    transports: ["websocket"],
    withCredentials: true,
});
