import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";

const LogOutHandler = async (req: Request, res: Response) => {
  return res
    .status(200)
    .clearCookie("token")
    .json({ status: "Success", message: "Logout Successfull" });
};

export default LogOutHandler;
