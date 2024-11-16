import { Router } from "express";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import UploadImageHandler from "./Handlers/UploadImageHandler";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); 
// using memory storage is not recommended due to restricted ram -> memory overhead

export const router = Router();

router.post("/profile", AuthMiddleware, upload.single("file"), UploadImageHandler);
