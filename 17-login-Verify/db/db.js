import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/UrlShortner`)
    } catch (error) {
        console.log("Error while Connecting to db")
    }
}
