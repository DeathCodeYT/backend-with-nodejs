import express from "express";
import { connectDB } from "./db/db.js";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
import { authRoutes } from "./routes/auth.routes.js";
import { noteRoutes } from "./routes/note.routes.js";

dotenv.config({path:"./.env"})

const app = express();

app.use(cookieParser())
app.use(express.urlencoded({extended:true,limit:"10mb"}))
app.use(express.json({limit:"10mb"}))
app.use(express.static('public'));

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/note',noteRoutes)

app.use(globalErrorHandler)
const PORT = process.env.PORT || 4000;
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch {
    console.log("Something went wrong");
  }
})();
