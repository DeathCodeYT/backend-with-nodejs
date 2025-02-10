import express from "express";
import dotenv from 'dotenv'
import fs from 'fs'
import status from "express-status-monitor"
dotenv.config({path:"./.env"})

const app = express();
app.use(status())
app.get('/',(req,res)=>{
    const stream = fs.createReadStream("./big.txt","utf-8")
    stream.on("data",(chunk)=>{
        res.write(chunk)
    })
    stream.on("end",()=>{
        res.end()
    })
})

const PORT = process.env.PORT || 4000;
(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch {
    console.log("Something went wrong");
  }
})();
