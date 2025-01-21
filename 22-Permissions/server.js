import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { urlRouter } from "./routes/url.routes.js";
import {connectDB} from './db/db.js'
import { globalErrorHandler } from "./utils/globalErrorhandler.js";
import { authRouter } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { Role } from "./model/role.model.js";
import { Permission } from "./model/permission.model.js";

dotenv.config({ path: "./.env" });
const app = express();
app.use(express.json({limit:"20mb"}))
app.use(urlencoded({extended:true,limit:"20mb"}))
app.use(cookieParser())

app.use(express.static('public'))

app.use('/api/v1',urlRouter)
app.use('/api/v1/auth',authRouter)

app.use(globalErrorHandler)

const PORT = process.env.PORT || 4000;
async function start() {
  try {
    await connectDB();
    await intit()
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
async function intit(){
  const admin = await Role.findOne({value:"admin"})
  if(!admin){
    const r = new Role({value:"admin",name:"Admin",priority:10000})
    const p = new Permission({value:"PERMISSION.BLOG.EDIT",name:"Permission of Edit Blog"})
    r.permissions.push(p._id)
    await p.save()
    await r.save()
  }
  const user = await Role.findOne({value:"user"})
  if(!user){
    const r = new Role({value:"user",name:"User"})
    const p = new Permission({value:"PERMISSION.URL.CREATE",name:"Permission of Create Blog"})
    r.permissions.push(p._id)
    await p.save()
    await r.save()
  }
}
start();
