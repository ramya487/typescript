import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import {connectDB, disConnectDB } from './config/db';
import {router as AuthRouter} from './routers/AuthRouter/router';

const port:any = process.env.PORT || 8000;

const app = express()

connectDB();

app.use(cors({
    origin: "*"
}))
app.use(express.json());

app.use("/auth", AuthRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("ok");
})

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

process.on('SIGTERM',() => {
    server.close(() => {
        disConnectDB();
    })
})

process.on('SIGINT',() => {
    server.close(() => {
        disConnectDB();
    })
})