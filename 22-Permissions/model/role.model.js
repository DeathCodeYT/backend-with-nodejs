import mongoose from "mongoose";


const roleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    priority:{
        type:Number,
        default:0
    },
    value:{
        type:String,
        required:true,
        unique:true
    },
    permissions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Permission"
        }
    ],
})


export const Role = mongoose.model("Role",roleSchema)