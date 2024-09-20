import { Router } from "express";
import SendMessageHandler from "./Handlers/SendMessageHandler";
import AuthMiddleware from "../../middleware/AuthMiddleware";

export const router = Router();

router.post("/sendmessage", AuthMiddleware, SendMessageHandler)