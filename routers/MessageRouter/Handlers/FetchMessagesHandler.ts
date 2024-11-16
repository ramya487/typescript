import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import Message from "../../../models/messageModel";

const FetchMessagesHandler = async (req: Request, res: Response) => {
  const chatId = req.params.chatid;

  if (!chatId || chatId == "")
    return generateResponse(400, "Failed", "Invalid Credentials", res);

  try {
    var response = await Message.find({ chat: chatId }).populate("chat").populate("sender", "-passwd"); // check if required to populate users, groupAdmin

    return generateResponse(200, "Success", "Messages fetched successfully", res, response);

  } catch (error) {
    return generateResponse(500, "Failed", "Error", res);
  }
};

export default FetchMessagesHandler;
