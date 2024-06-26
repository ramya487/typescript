import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import Chat from "../../../models/chatModel";

const AddToGroupHandler = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId)
    return generateResponse(400, "Failed", "Invalid Credentials", res);

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    );

    if (!updatedChat)
      return generateResponse(500, "Failed", "Chat not found", res);

    return generateResponse(201, "Success", "User added to group", res);
  } catch (error) {
    return generateResponse(500, "Failed", "Error", res);
  }
};

export default AddToGroupHandler;
