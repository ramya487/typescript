import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import Chat from "../../../models/chatModel";
import Message from "../../../models/messageModel";

const FetchMessagesHandler = async (req: Request, res: Response) => {
  const chatId = req.params.chatid;

  if (!chatId || chatId == "")
    return generateResponse(400, "Failed", "Invalid Credentials", res);

  try {
    const response = await Message.find({ chat: chatId }); // check if required to populate
    return generateResponse(200, "Success", "Messages fetched successfully", res, response);

  } catch (error) {
    console.log(error);
    return generateResponse(500, "Failed", "Error", res);
  }
};

export default FetchMessagesHandler;
