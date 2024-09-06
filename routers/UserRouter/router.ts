import { Router } from "express";
import FetchUserProfileHandler from "./Handlers/FetchUserProfileHandler";
import AuthMiddleware from "../../middleware/AuthMiddleware";

export const router = Router();

router.get("/profile",AuthMiddleware, FetchUserProfileHandler)