import { Router } from "express";
import GetAllUsersHandler from "./Handlers/GetAllUsersHandler";

export const router = Router();

router.get("/allusers", GetAllUsersHandler);