import express from "express";
import dotenv from "dotenv";
import { urlRouter } from "./routes/url.routes.js";
import {connectDB} from './db/db.js'
import { globalErrorHandler } from "./utils/globalErrorhandler.js";
import { authRouter } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./.env" });
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1',urlRouter)
app.use('/api/v1/auth',authRouter)

app.use(globalErrorHandler)

const PORT = process.env.PORT || 4000;
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
