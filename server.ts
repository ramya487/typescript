import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB, disConnectDB } from "./config/db";
import { router as AuthRouter } from "./routers/AuthRouter/router";
import { router as ChatRouter } from "./routers/ChatRouter/router";
import { router as UserRouter } from "./routers/UserRouter/router";
import cookieParser from "cookie-parser";

const port: any = process.env.PORT || 8000;

const app = express();

connectDB();

const whitelisted = ["*", process.env.FRONTEND_URL as string];

app.use(
  cors({
    origin: whitelisted,
    credentials: true,
    methods: ["*", "GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", AuthRouter);
app.use("/chat", ChatRouter);
app.use("/user", UserRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("ok");
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    disConnectDB();
  });
});

process.on("SIGINT", () => {
  server.close(() => {
    disConnectDB();
  });
});
