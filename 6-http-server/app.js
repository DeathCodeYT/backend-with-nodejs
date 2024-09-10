import * as http from 'http'
import * as fs from 'fs'

const server = http.createServer((req,res)=>{
    // console.log(req)
    let logStr = `${Date.now()} - (${req.url})[${req.method}]\n`
    fs.appendFile('./logs.log',logStr,(err)=>{
        if(err){
            res.send("SOmethin went wrong")
        }
    })
    switch (req.url) {
        case "/":
            if(req.method=="GET")
                res.end("Welcome, To Home Page")
            else if(req.method=="POST")
                res.end("Welcome, To Home Page (POST)")
            break;
        case "/about":
            res.end("Welcome, To About Page")
            break;
        case "/course":
            res.end("Welcome, To Course Page")
            break;
            
            default:
            res.end("404 not found")
            break;
    }


})

const PORT = process.env.PORT | 4000

server.listen(PORT,()=>{
    console.log(`Server is Listening on http://localhost:${PORT}`)
})

