const { createServer } = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 10000;

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

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://x-omega-one.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
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

httpServer.listen(PORT, () => {
  console.log(`✅ Socket server is running on port ${PORT}`);
});
