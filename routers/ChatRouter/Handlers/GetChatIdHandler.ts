import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import Chat from "../../../models/chatModel";
import axios from "axios";

const GetChatIdHandler = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) return generateResponse(400, "Failed", "User Id Required", res);

  try {
    const existingChat = await Chat.findOne({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.session.id } } },
        { users: { $elemMatch: { $eq: id } } },
      ],
    });

    if (existingChat) {
      return generateResponse(
        200,
        "Success",
        "ChatId Fetched Successfully",
        res,
        existingChat
      );
    } else {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/chat/createchat`,
        { id, id2: req.session.id },
      );

      const newChat = response.data;

      return generateResponse(
        200,
        "Success",
        "ChatId Fetched Successfully",
        res,
        newChat
      );
    }

  } catch (error: any) {
    return generateResponse(500, "Failed", "Error", res);
  }
};

export default GetChatIdHandler;
