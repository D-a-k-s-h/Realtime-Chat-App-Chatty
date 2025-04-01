const express = require('express');
require('dotenv').config();
const auth = require('./routes/auth');
const { dBConnect } = require('./config/database');
const cookieParser = require("cookie-parser");
const { cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");
const { app, server } = require('./config/socket');
const path = require("path");

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server connected to port = ${PORT}`);
});


app.use(
    cors({
        origin:"https://realtime-chat-app-chatty-li7x.onrender.com",
        credentials:true
    })
)

//to parse json data
app.use(express.json());
app.use(cookieParser());

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'../frontend/dist')));

    // app.use('/api/v1/auth',auth);
    // app.use('/api/v1/messages',messageRoutes);

    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:'/tmp/'
    })
)

app.use('/api/v1/auth',auth);
app.use('/api/v1/messages',messageRoutes);

//connect to database
dBConnect();

//connect to cloudinary
cloudinaryConnect();

app.use("/", (req,res) => {
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
})