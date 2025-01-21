import express from "express";
import dotenv from "dotenv";
import path from 'path'
import { urlRouter } from "./routes/url.routes.js";
import {connectDB} from './db/db.js'
import { globalErrorHandler } from "./utils/globalErrorhandler.js";
import { Url } from "./model/url.model.js";
dotenv.config({ path: "./.env" });
const app = express();
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: true }));

app.get('/',async (req,res)=>{
  const urls = await Url.find()
  return res.render('home',{name:"DeathCode",urls})
})
app.use('/api/v1',urlRouter)

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
