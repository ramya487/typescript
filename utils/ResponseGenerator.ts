import { Response } from "express";

const generateResponse = (
  statusCode: number,
  status: string,
  message: string,
  res: Response,
  data?: any
) => {
  if (data) return res.status(statusCode).json({ status, message, data });
  return res.status(statusCode).json({ status, message });
};

export default generateResponse;
