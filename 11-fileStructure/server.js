import express from 'express'
import {connectDB} from './db/db.js'
import dotenv from 'dotenv'
import { authRouter } from './routes/auth.routes.js'
dotenv.config({
    path:"./.env"
})

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Welcome To DC Server")
})

const apiUrl = "/api/v1"
app.use(`${apiUrl}/auth`,authRouter)

const PORT = process.env.PORT ?? 3000
async function start(){
    try {
        await connectDB()
        app.listen(PORT,()=>{
            console.log(`Server is listening on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

