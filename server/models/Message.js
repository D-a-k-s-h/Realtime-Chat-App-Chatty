const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        trim:true,
    },
    image:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = new mongoose.model("Message",messageSchema);