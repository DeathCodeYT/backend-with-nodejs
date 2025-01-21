import mongoose, { Mongoose, Schema } from "mongoose";

const urlSchema = new Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visited:{
        type:Number,
        default:0
    },
    shortedUrl:{
        type:String,
    }
},{timestamps:true})

export const Url = mongoose.model("Url",urlSchema)
