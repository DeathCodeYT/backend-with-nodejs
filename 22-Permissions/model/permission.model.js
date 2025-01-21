import mongoose from "mongoose";


const permissionSchema = new mongoose.Schema({
    value:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
})

export const Permission = mongoose.model("Permission",permissionSchema)