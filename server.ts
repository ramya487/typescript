import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const port:any = process.env.PORT;

const app = express()        

app.get("/", (req, res) => {
    res.send("ok");
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})