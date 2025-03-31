const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date,
    }
});

module.exports = new mongoose.model("User",userSchema);