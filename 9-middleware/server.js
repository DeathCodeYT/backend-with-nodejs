import express from 'express'

const app = express()
app.use(express.urlencoded({extended:false}))
// app.use(express.json())

// Custom Middlewares
app.use((req,res,next)=>{
    console.log("This is my first middleware")
    if(req.body.login)
        next()
    else{
        res.send("Not a valid user")
    }
})
app.use((req,res,next)=>{
    console.log("This is my second middleware")
    req.user = "DeathCode"
    next()
})

app.get('/',(req,res)=>{
    res.send("Welcome To DC Server "+req.user)
})

const PORT = 4000

const start = ()=>{
    app.listen(PORT,()=>{
        console.log(`Server started on http://localhost:${PORT}`)
    })
}

start()