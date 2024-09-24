import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import Message from "../../../models/messageModel";
import User from "../../../models/userModel";

const SendMessageHandler = async (req: Request, res: Response) => {
  const { content, chatId } = req.body;

  if (!content || !chatId)
    return generateResponse(400, "Failed", "Invalid Credentials", res);

  const newMessage = {
    sender: req.session.id,
    content: content,
    chat: chatId,
  };

  try {
    var response: any = await (
      await (await Message.create(newMessage)).populate("chat")
    ).populate("sender", "-passwd");

    // users array, groupAdmin in chat property are not direct keys in the response thus the following method is used to populate
    response = await User.populate(response, {
      path: "chat.users",
      select: "-passwd",
    });
    response = await User.populate(response, {
      path: "chat.groupAdmin",
      select: "-passwd",
    });

    return generateResponse(201, "Success", "Message Created Successfully", res, response);
  } catch (error) {
    return generateResponse(500, "Failed", "Error", res);
  }
};

export default SendMessageHandler;
