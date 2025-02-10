import express from "express";
import dotenv from "dotenv";
import { Server } from 'socket.io';
import http from 'http'

dotenv.config({ path: "./.env" });
const app = express();
const server = http.createServer(app);
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

io.on("connection",(socket)=>{
  console.log("a user connected: ",socket.id);

  socket.on("disconnect",()=>{
    console.log( "a user disconnected: ", socket.id);
    
  })
  // socket.emit("hello",{name:"DeathCode"})
  socket.join("room1")
  socket.on("message",(data)=>{
    socket.to("room1").emit("newMessage",data)
  })
})

const PORT = process.env.PORT || 4000;
async function start() {
  try {
    server.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
