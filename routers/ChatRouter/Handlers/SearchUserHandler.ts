import { Request, Response } from "express";
import User from "../../../models/userModel";
import generateResponse from "../../../utils/ResponseGenerator";

const SearchUserHandler = async (req: Request, res: Response) => {
  const user = req.query.user;

  if (!user || user == "") {
    try {
      const allUsers: Array<any> = await User.find(
        { _id: { $ne: req.session.id } },
        { passwd: 0 }
      );

      return generateResponse(
        200,
        "Success",
        "Users fetched successfully",
        res,
        allUsers
      );

    } catch (error: any) {
      return generateResponse(500, "Failed", "Could not get Users", res);
    }
  }

  const options = {
    $or: [
      { name: { $regex: user, $options: "i" } },
      { email: { $regex: user, $options: "i" } },
    ],
  };

  try {
    const allUsers: Array<any> = await User.find(options, { passwd: 0 }).find({
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
    return generateResponse(500, "Failed", "Could not get Users", res);
  }
};

export default SearchUserHandler;
