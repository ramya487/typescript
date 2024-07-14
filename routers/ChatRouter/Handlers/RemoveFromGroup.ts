import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import Chat from "../../../models/chatModel";

const RemoveFromGroupHandler = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId)
    return generateResponse(400, "Failed", "Invalid credentials", res);

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    );

    if (!updatedChat)
      return generateResponse(500, "Failed", "Chat not found", res);

    return generateResponse(201,"Success","User removed from group successfully",res);

  } catch (error) {
    return generateResponse(500, "Failed", "Error", res);
  }
};

export default RemoveFromGroupHandler;
