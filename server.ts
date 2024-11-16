import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB, disConnectDB } from "./config/db";
import { router as AuthRouter } from "./routers/AuthRouter/router";
import { router as ChatRouter } from "./routers/ChatRouter/router";
import { router as UserRouter } from "./routers/UserRouter/router";
import { router as MessageRouter } from "./routers/MessageRouter/router";
import { router as UploadRouter } from "./routers/UploadRouter/router";
import cookieParser from "cookie-parser";

import { createServer } from "http";
import { Server } from "socket.io";

const port: any = process.env.PORT || 8000;
const whitelisted = [process.env.FRONTEND_URL as string];

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: whitelisted,
  },
});

connectDB();

app.use(
  cors({
    origin: whitelisted,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", AuthRouter);
app.use("/chat", ChatRouter);
app.use("/user", UserRouter);
app.use("/message", MessageRouter);
app.use("/upload", UploadRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("ok");
});

io.on("connection", (socket) => {
  console.log("User with id: ", socket.id, "connected!!"); // note when the ws connection fails and is reinstantiated the id changes every time even for the same user

  socket.on("createUserRoom", (profile) => {
    socket.join(profile.id);
  });

  socket.on("newMessage", (newMessageObject) => {
    const chat = newMessageObject.chat;
    chat.users.forEach((userId: string) => {
      if (userId == newMessageObject.sender._id) return;
      socket.in(userId).emit("messageReceived", newMessageObject);
    });
  });

  socket.on("sendChat", (chatObject, profileId) => {
    // for individual and group chat creations
    const users = chatObject.users;
    users.forEach((userObject: any) => {
      if (userObject._id == profileId) return;
      socket.in(userObject._id).emit("newChat", chatObject);
    });
  });

  socket.on("latestMsgUpdate", (updatedChatObject) => {
    const chat = updatedChatObject.users;
    chat.forEach((userObject: any) => {
      if (userObject._id == updatedChatObject.latestMessage.sender) return;
      socket.in(userObject._id).emit("latestMsgUpdateFrnt", updatedChatObject);
    });
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    disConnectDB();
  });
});

process.on("SIGINT", () => {
  server.close(() => {
    disConnectDB();
  });
});
