// creation of individual chat

import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import Chat from "../../../models/chatModel";

const CreateChatHandler = async (req: Request, res: Response) => {
  const { id } = req.body; // second user id

  if (!id) generateResponse(500, "Failed", "User Id Required", res);

  try {
    const newChat = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.session.id, id],
    };

    const createdChat = await Chat.create(newChat);

    res.status(201).send(createdChat);
  } catch (error: any) {
    res.status(500).send("Error");
  }
};

export default CreateChatHandler;
