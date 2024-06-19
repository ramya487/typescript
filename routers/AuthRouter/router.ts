import { Router } from "express";
import LoginHandler from "./Handlers/LoginHandler";
import SignupHandler from "./Handlers/SignupHandler";

export const router = Router();

router.post("/login", LoginHandler);
router.post("/signup", SignupHandler);
