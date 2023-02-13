import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
dotenv.config()
import http from "http"
import { Server } from "socket.io"
import generator from 'generate-password'
import { MongoClient } from "mongodb"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import {auth} from './auth/auth.js'
import auctionRouter from './routers/auction.route.js'
import amountRouter from './routers/amount.route.js'
import autogenpasswordRouter from './routers/autogenpassword.route.js'


const app = express()

const MONGO_URL = process.env.MONGO_URL

const client = new MongoClient(MONGO_URL)
await client.connect()


const PORT =4001
const server = http.createServer(app)

const io = new Server (server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
});
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true

}))


async function genHashedPassword (password){
    const NO_OF_ROUND = 10
    const salt = await bcrypt.genSalt(NO_OF_ROUND)
    const hashed_password =await bcrypt.hash(password,salt)
    return hashed_password
    }


app.get('/',(request,response)=>{
    response.send("hi")
})




app.use('/amount',amountRouter)
app.use('/auction',auctionRouter)
app.use('/autogenpassword',autogenpasswordRouter)



io.on('connection',(socket)=>{

    socket.on('join-room',(data)=>{
        socket.join(data)
       
    })
    
    socket.on('send-next',(data)=>{
        socket.to(data.room).emit('receive-next',data);
    })

    socket.on('send-players',(data)=>{
        socket.to(data.room).emit('receive-players',data);
    })
    socket.on('send-amount',(data)=>{
        socket.to(data.room).emit('receive-amount',data);
    })

    socket.on('send-start',(data)=>{
        socket.to(data.room).emit('receive-start',data);
    })

    socket.on('send-nil',(data)=>{
        socket.to(data.room).emit('receive-nil',data);
    })

    socket.on('send-team',(data)=>{
        socket.to(data.room).emit('receive-team',data);
    })

    socket.on('send-details',(data)=>{
        socket.to(data.room).emit('receive-details',data);
    })

        socket.on('disconnect',()=>{
            
      
    })
})

server.listen(PORT)

export {client,auth,genHashedPassword,jwt,generator,bcrypt}