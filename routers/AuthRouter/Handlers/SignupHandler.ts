import { Request, Response } from "express";
import User from "../../../models/userModel";
import bcrypt from 'bcrypt'

const SignupHandler = async (req: Request, res: Response) => {
  const { name, email, passwd } = req.body;
  if (!name || !email || !passwd)
    return res
      .status(400)
      .json({ status: "Failed", message: "Invalid Credentials" });

  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res
      .status(400)
      .json({ status: "Failed", message: "User already exists" });


  const SALT_ROUNDS:number = Number(process.env.SALT_ROUNDS);
  const newPass = await bcrypt.hash(passwd, SALT_ROUNDS);

  const newUser = await User.create({ name, email, passwd: newPass });

  return res
    .status(201)
    .json({ status: "Success", message: "User created successfully" });
};
export default SignupHandler;
