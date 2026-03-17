import express from 'express'
import cors from 'cors'
import authRouter from './view/authRouter.js';
import http from 'http'
import { Server } from 'socket.io';
import { socketInit } from './socket/index.js';
const port = process.env.PORT || 8080;
const app = express()
app.use(cors())
app.use(express.json())
app.use(authRouter)
app.get('/', (req, res) => {
    res.send("hello")
})
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

socketInit(io);

httpServer.listen(port, () => {
    console.log(`http server is running at port ${port}`)
})