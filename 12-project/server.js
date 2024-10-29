import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/db.js'
import { blogRouter } from './routes/blog.routes.js'

dotenv.config({
    path:"./.env"
})



const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Welcome, To My Server")
})

const API_URL = '/api/v1'
app.use(`${API_URL}/blog`,blogRouter)

const PORT = process.env.PORT || 4000
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
