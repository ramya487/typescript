import { Router } from "express";
import SendMessageHandler from "./Handlers/SendMessageHandler";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import FetchMessagesHandler from "./Handlers/FetchMessagesHandler";
import UpdateLatestMessageHandler from "./Handlers/UpdateLatestMessageHandler";

export const router = Router();

router.post("/sendmessage", AuthMiddleware, SendMessageHandler);
router.get("/fetchmessages/:chatid", AuthMiddleware, FetchMessagesHandler);
router.post("/updatelatestmsg", AuthMiddleware, UpdateLatestMessageHandler);
