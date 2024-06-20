import { Response } from "express";

const generateResponse = (
  statusCode: number,
  status: string,
  message: string,
  res: Response
) => {
  return res.status(statusCode).json({ status, message });
};

export default generateResponse;