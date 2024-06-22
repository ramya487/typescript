import { Request, Response } from "express";
import User from "../../../models/userModel";
import generateResponse from "../../../utils/ResponseGenerator";

const GetAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const allUsers: Array<any> = await User.find({
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

export default GetAllUsersHandler;
