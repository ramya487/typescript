import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";

const FetchUserProfileHandler = async (req: Request, res: Response) => {
    try {
        const data = req.session;
        console.log(req.session);
        return generateResponse(200, "Success", "Profile fetched Successfully", res, data);
    } catch (error) {
        return generateResponse(500, "Failed", "Error fetching profile", res);
    }
};

export default FetchUserProfileHandler;