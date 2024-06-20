import { Request, Response } from "express";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateResponse from "../../../utils/ResponseGenerator";

const LoginHandler = async (req: Request, res: Response) => {
  const { email, passwd } = req.body;

  if (!email || !passwd)
    return generateResponse(400, "Failed", "Invalid Credentials", res);

  const existingUser: any = await User.findOne({ email });


  if (!existingUser)
    return generateResponse(400, "Failed", "Invalid Credentials", res);


  const status = await bcrypt.compare(passwd, existingUser.passwd);

  if (!status)
    return generateResponse(400, "Failed", "Invalid Credentials", res);
  
  let token;
  try {
    token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      },
      process.env.JWT_SECRET! // !- tells the compiler that the variable is not null/undefined for sure
    );
  } catch (error) {
    return generateResponse(500, "Failed", "Error", res);
  }

  return res
    .status(200)
    .cookie("token", token)
    .json({ status: "Success", message: "Login Successful" });
};
export default LoginHandler;
