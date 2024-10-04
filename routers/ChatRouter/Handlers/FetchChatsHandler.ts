import { Request, Response } from "express";
import Chat from "../../../models/chatModel";
import generateResponse from "../../../utils/ResponseGenerator";

const FetchChatsHandler = async (req: Request, res: Response) => {
  try {
    const userChats = await Chat.find({
      users: { $elemMatch: { $eq: req.session.id } },
    })
      .populate("users", "-passwd")
      .populate("groupAdmin", "-passwd");

    return generateResponse(
      200,
      "Success",
      "Chats fetched successfully", 
      res,
      userChats
    );
  } catch (error) {
    return generateResponse(500, "Failed", "Error fetching chats", res);
  }
};

export default FetchChatsHandler;
