import { Router } from "express";
import GetAllUsersHandler from "./Handlers/GetAllUsersHandler";
import GetChatIdHandler from "./Handlers/GetChatIdHandler";
import CreateChatHandler from "./Handlers/CreateChatHandler";
import AuthMiddleware from "../../middleware/AuthMiddleware";

export const router = Router();

router.get("/allusers",AuthMiddleware ,GetAllUsersHandler);
router.post("/chatid", AuthMiddleware, GetChatIdHandler);
router.post("/createchat", CreateChatHandler);