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

    const createdChat = await (await Chat.create(newChat)).populate("users", "-passwd");

    return generateResponse(201, "Success", "Chat Created Successfully", res, createdChat);
  } catch (error: any) {
    return generateResponse(500, "Failed", "Error", res);
  }
};

export default CreateChatHandler;
