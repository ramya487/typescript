import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import Chat from "../../../models/chatModel";

const RenameGroupHandler = async (req: Request, res: Response) => {
  const { chatId, chatName } = req.body;

  if (!chatId || !chatName)
    return generateResponse(400, "Failed", "Invalid credentials", res);

  try {
    const renamedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      {
        new: true, // to return updated chat
      }
    );

    if (!renamedChat)
      return generateResponse(500, "Failed", "Chat not found", res);

    return generateResponse(201, "Success", "Update Success", res);
  } catch (error) {
    return generateResponse(500, "Failed", "Error", res);
  }
};

export default RenameGroupHandler;
