import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import Chat from "../../../models/chatModel";

const AddToGroupHandler = async (req: Request, res: Response) => {
  var { chatId, userIds } = req.body;

  if (!chatId || userIds.length <= 0)
    return generateResponse(400, "Failed", "Invalid Credentials", res);

  try {
    var updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: { $each: userIds } },
      },
      {
        new: true,
      }
    )
      .populate("users", "-passwd")
      .populate("groupAdmin", "-passwd")
      .populate("latestMessage");

      updatedChat = await Chat.populate(updatedChat, {
        path: "latestMessage.sender",
        select: "-passwd"
      })

    if (!updatedChat)
      return generateResponse(500, "Failed", "Chat not found", res);

    return generateResponse(
      201,
      "Success",
      "User added to group",
      res,
      updatedChat
    );
  } catch (error) {
    return generateResponse(500, "Failed", "Error", res);
  }
};

export default AddToGroupHandler;
