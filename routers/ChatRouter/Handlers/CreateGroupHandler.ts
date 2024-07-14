import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import Chat from "../../../models/chatModel";

const CreateGroupHandler = async (req: Request, res: Response) => {
  const { name, users } = req.body;

  if (!name || !users)
    return generateResponse(400, "Failed", "Invalid credentials", res);

  var usersArray = JSON.parse(users);

  if (usersArray.length < 2)
    return generateResponse(400, "Failed", "Require min 2 users", res);

  const newGroup = {
    chatName: name,
    isGroupChat: true,
    users: [...usersArray, req.session.id],
    groupAdmin: req.session.id,
  };

  try {
    const groupChat = await Chat.create(newGroup);

    return generateResponse(201, "Success", "Group chat created", res);
  } catch (error: any) {
    console.log(error);
    return generateResponse(500, "Failed", "Error creating group chat", res);
  }
};

export default CreateGroupHandler;
