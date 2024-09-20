import express from 'express'
import mongoose from 'mongoose'
import * as fs from 'fs'
import blogs from './MOCK_DATA.json' with {type:"json"}

const app = express()
app.use(express.urlencoded({extended:false}))
// app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Welcome To DC Server")
})


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is Required"],
    },
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comments:[
        {
            user:{
                type:String,
            },
            comment:{
                type:String,
            }
        }
    ]
},{timestamps:true})

const Blog = mongoose.model("Blog",blogSchema)

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is Required"],
        unique:true,
        lowercase:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male",'female','others']
    },
    followers:{
        type:Number,
        min:0,
        max:10
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)





app.get('/blogs',(req,res)=>{
    const str=`
    ${blogs.map(blog=>`
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <span>${blog.author} - ${blog.publish_date}</span>
        <hr>
        `).join("")}
    `
    res.send(str)
})

app.route('/api/v1/blog').get((req,res)=>{
    res.send(blogs)
}).post((req,res)=>{
    const {title,content,author} = req.body
    const blog = {
        title,
        content,
        author
    }
    blog.publish_date = new Date().toISOString().split('T')[0]
    blog.id = blogs.length +1
    blogs.push(blog)
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(blogs),(err)=>{
        if(err) return res.send({success:false,message:err})
        res.send({
            success:true,
            blog:blog
        })
    })
})

app.route('/api/v1/blog/:id').get((req,res)=>{
    const id = parseInt(req.params.id)
    const blog = blogs.find((blog)=>blog.id==id)
    if(!blog) return res.send({
        success:false,
        message:"Blog Not Found"
    })
    res.send(blog)
}).delete((req,res)=>{
    const id = parseInt(req.params.id)
    const blog = blogs.find((blog)=>blog.id==id)
    if(!blog) return res.send({
        success:false,
        message:"Blog Not Found"
    })
    let newBlogs = blogs.filter((blog)=>blog.id!=id)
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(newBlogs),(err)=>{
        if(err) return res.send({success:false,message:err})
            res.send({
                success:true,
                blog:blog
            })
    })
}).patch((req,res)=>{
    const id = parseInt(req.params.id)
    const body = req.body
    const query = {}

    if(body.title) query.title=body.title
    if(body.content) query.content=body.content    

    const blog = blogs.find((blog)=>blog.id==id)
    if(!blog) return res.send({
        success:false,
        message:"Blog Not Found"
    })
    let newBlogs = blogs.map(blog=>{
        if(blog.id==id){
            return {...blog,...query}
        }else{
            return blog
        }
    })
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(newBlogs),(err)=>{
        if(err) return res.send({success:false,message:err})
            res.send({
                success:true,
                blog:{...blog,...query},
                message:"Updated"
            })
    })
})

const PORT = 4000

const start = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/YTBLOG')
        app.listen(PORT,()=>{
            console.log(`Server started on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

