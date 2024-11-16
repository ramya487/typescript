import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import Message from "../../../models/messageModel";
import Chat from "../../../models/chatModel";

const UpdateLatestMessageHandler = async (req: Request, res: Response) => {
  const { msgId, chatId } = req.body;
  
  if (!msgId || !chatId)
    return generateResponse(400, "Failed", "Invalid Credentials", res);

  try {
    var response = await Chat.findByIdAndUpdate(
      chatId,
      { latestMessage: msgId },
      {
        new: true,
      }
    ).populate("latestMessage").populate("users", "-passwd").populate("groupAdmin", "-passwd");

    response = await Chat.populate(response, {
      path: "latestMessage.sender",
      select: "-passwd"
    })
    
    return generateResponse(201, "Success", "Latest Message Updated", res, response)
  } catch (error) {
    return generateResponse(500, "Failed", "Error in Updation of Latest Message", res);
  }
};

export default UpdateLatestMessageHandler;
