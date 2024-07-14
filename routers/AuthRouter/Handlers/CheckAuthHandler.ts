import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";

const CheckAuthHandler = async (req: Request, res: Response) => {
    return generateResponse(200, "Success", "Authorized", res);
}

export default CheckAuthHandler;