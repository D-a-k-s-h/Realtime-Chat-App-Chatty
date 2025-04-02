const socket = require("socket.io");
const Server = socket.Server;
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:["https://realtime-chat-app-chatty-li7x.onrender.com"]
    }
});

//to store online users
//we will make {userId:socket.id}
const userSocketMap = {};

const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
}

io.on("connection",(socket) => {
    console.log("A user connected",socket.id);

    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id;
    }

    //io.emit() is used to send events to all connected clients
    //basically tell everyone that user is connected
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",() => {
        console.log("A user disconnected",socket.id);
        //when user disconnect then remove them from online users
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

module.exports = { io, app, server,getReceiverSocketId };