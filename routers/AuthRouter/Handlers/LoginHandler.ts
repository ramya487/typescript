import { Request, Response } from "express";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const LoginHandler = async (req: Request, res: Response) => {
  const { email, passwd } = req.body;
  if (!email || !passwd)
    res.status(400).json({ status: "Failed", message: "Invalid Credentials" });

  const existingUser: any = await User.findOne({ email });

  if (!existingUser)
    res.status(400).json({ status: "Failed", message: "Invalid Credentials" });

  const status = await bcrypt.compare(passwd, existingUser.passwd);

  if (!status)
    res.status(400).json({ status: "Failed", message: "Invalid Credentials" });

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
    res.status(500).json({ status: "Failed", message: "Error" });
  }

  res
    .status(200)
    .cookie("token", token)
    .json({ status: "Success", message: "Login Successful" });
};
export default LoginHandler;
