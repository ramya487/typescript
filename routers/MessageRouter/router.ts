import { Router } from "express";
import SendMessageHandler from "./Handlers/SendMessageHandler";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import FetchMessagesHandler from "./Handlers/FetchMessagesHandler";

export const router = Router();

router.post("/sendmessage", AuthMiddleware, SendMessageHandler)
router.get("/fetchmessages/:chatid", AuthMiddleware, FetchMessagesHandler);