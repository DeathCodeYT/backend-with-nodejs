import express from 'express'
import * as fs from 'fs'
import blogs from './MOCK_DATA.json' with {type:"json"}

const app = express()
app.use(express.urlencoded({extended:false}))
// app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Welcome To DC Server")
})

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

const start = ()=>{
    app.listen(PORT,()=>{
        console.log(`Server started on http://localhost:${PORT}`)
    })
}

start()

