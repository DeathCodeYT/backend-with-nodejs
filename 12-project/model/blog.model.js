import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title:{
        type:String,
        require:[true,"Title is Required"]
    },
    description:{
        type:String,
    },
    content:{
        type:String,
        require:[true,"Content is Required"]
    },
},{timestamps:true})

export const Blog = mongoose.model("Blog",blogSchema)