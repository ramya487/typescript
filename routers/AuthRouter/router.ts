import { Router } from "express";
import LoginHandler from "./Handlers/LoginHandler";
import SignupHandler from "./Handlers/SignupHandler";
import CheckAuthHandler from "./Handlers/CheckAuthHandler";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import LogOutHandler from "./Handlers/LogOutHandler";

export const router = Router();

router.get("/", AuthMiddleware, CheckAuthHandler);
router.post("/login", LoginHandler);
router.post("/signup", SignupHandler);
router.post("/logout", LogOutHandler);
