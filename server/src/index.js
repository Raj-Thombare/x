import express from "express";
import "dotenv/config";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT || 7000;

const app = express();
const httpServer = createServer(app);

let onlineUsers = [];

const addUser = (username, socketId) => {
  const isExist = onlineUsers.find((user) => user.socketId === socketId);

  if (!isExist) {
    onlineUsers.push({ username, socketId });
    console.log(username + " added!");
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  console.log("user removed!");
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  socket.on("newUser", (username) => {
    addUser(username, socket.id);
  });

  socket.on("sendNotification", ({ receiverUsername, data }) => {
    const receiver = getUser(receiverUsername);

    if (receiver) {
      io.to(receiver.socketId).emit("getNotification", {
        id: uuidv4(),
        ...data,
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("Client disconnected: ", socket.id);
  });
});

app.use(cors());

app.use("/", (req, res) => {
  return res.send("Its working");
});

httpServer.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
