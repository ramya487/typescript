import { Request, Response } from "express";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";
import generateResponse from "../../../utils/ResponseGenerator";

const SignupHandler = async (req: Request, res: Response) => {
  const { name, email, passwd } = req.body;
  if (!name || !email || !passwd)
    generateResponse(400, "Failed", "Invalid Credentials", res);

  const existingUser = await User.findOne({ email });

  if (existingUser)
    generateResponse(400, "Failed", "User Already Exists", res);

  const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS);
  const newPass = await bcrypt.hash(passwd, SALT_ROUNDS);

  const newUser = await User.create({ name, email, passwd: newPass });

  generateResponse(201, "Success", "User Created Successfully", res);
};
export default SignupHandler;
