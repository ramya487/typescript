import { Request, Response, NextFunction } from "express";
import generateResponse from "../utils/ResponseGenerator";
import jwt, { JwtPayload } from "jsonwebtoken";

interface SessionType {
  username: string;
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      session: SessionType;
    }
  }
}

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["token"]; 
  // note: cookies shall be received on the backend only when send from a client component on the frontend

  if (!token) {
    return generateResponse(401, "Failed", "UnAuthorised", res);
  }
  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch (error: any) {
    return generateResponse(401, "Failed", "UnAuthorised", res);
  }
  req.session = {
    username: decoded.username,
    email: decoded.email,
    id: decoded.id,
  };
  next();
};
export default AuthMiddleware;
