import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/YTBLOG`)
    } catch (error) {
        console.log("Error while Connecting to db")
    }
}
