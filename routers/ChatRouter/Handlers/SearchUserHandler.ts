import { Request, Response } from "express";
import User from "../../../models/userModel";
import generateResponse from "../../../utils/ResponseGenerator";

const SearchUserHandler = async (req: Request, res: Response) => {
  const user = req.params.user;

  if (!user || user == "") {
    generateResponse(400, "Failed", "User name required", res);
  }

  const options = {
    $or: [
      { name: { $regex: user, $options: "i" } },
      { email: { $regex: user, $options: "i" } },
    ],
  }
  
  try {
    const allUsers: Array<any> = await User.find(options).find({
      _id: { $ne: req.session.id },
    });

    return generateResponse(
      200,
      "Success",
      "Users fetched successfully",
      res,
      allUsers
    );
  } catch (error: any) {
    console.log(error);
    return generateResponse(500, "Failed", "Could not get Users", res);
  }
};

export default SearchUserHandler;
