import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/NotesAPI`)
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}