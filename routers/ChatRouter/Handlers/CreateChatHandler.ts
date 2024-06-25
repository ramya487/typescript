import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import Chat from "../../../models/chatModel";

const CreateChatHandler = async (req: Request, res: Response) => {
  const { id, id2 } = req.body;

  if (!id || !id2) generateResponse(500, "Failed", "User Id Required", res);

  try {
    const newChat = {
      chatName: "sender",
      isGroupChat: false,
      users: [id, id2],
    };

    const createdChat = await Chat.create(newChat);

    res.status(201).send(createdChat);

  } catch (error: any) {
    res.status(500).send("Error");
  }
};

export default CreateChatHandler;
