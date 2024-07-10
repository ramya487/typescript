import { Router } from "express";
import SearchUserHandler from "./Handlers/SearchUserHandler";
import GetChatIdHandler from "./Handlers/GetChatIdHandler";
import CreateChatHandler from "./Handlers/CreateChatHandler";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import FetchChatsHandler from "./Handlers/FetchChatsHandler";
import CreateGroupHandler from "./Handlers/CreateGroupHandler";
import RenameGroupHandler from "./Handlers/RenameGroupHandler";
import AddToGroupHandler from "./Handlers/AddToGroupHandler";
import RemoveFromGroupHandler from "./Handlers/RemoveFromGroup";

export const router = Router();

router.get("/searchuser",AuthMiddleware ,SearchUserHandler);
router.post("/chatid", AuthMiddleware, GetChatIdHandler);
router.post("/createchat", CreateChatHandler);
router.get("/fetchchats", AuthMiddleware, FetchChatsHandler);
router.post("/creategroup", AuthMiddleware, CreateGroupHandler);
router.put("/renamegroup", AuthMiddleware, RenameGroupHandler);
router.put("/addtogroup", AuthMiddleware, AddToGroupHandler); // single user
router.put("/removefromgroup", AuthMiddleware, RemoveFromGroupHandler);