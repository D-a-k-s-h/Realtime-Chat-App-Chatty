const User = require("../models/User")
const Message = require("../models/Message");
const { imageUploader } = require("../utils/imageUploader");
const { getReceiverSocketId, io } = require("../config/socket");
require("dotenv").config();

exports.getAllUsers = async(req,res) => {
    try{
        const userId = req.user.userId;

        const userDetails = await User.find({_id:{$ne:userId}});

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"Users not found"
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Users found",
            data:userDetails
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getMessages = async(req,res) => {
    try{
        const senderId = req.user.userId;

        const {receiverId} = req.body;

        if(!receiverId){
            return res.status(404).json({
                success:false,
                message:"Receiver ID not found"
            })
        }

        if(!senderId){
            return res.status(404).json({
                success:false,
                message:"Sender ID not found"
            })
        }

        const messages = await Message.find({
            $or:[
                {senderId:senderId,receiverId:receiverId},
                {senderId:receiverId,receiverId:senderId}
            ]
        });

        //return response
        return res.status(200).json({
            success:true,
            message:"All messages retrieved",
            data:messages
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.sendMessage = async(req,res) => {
    try{
        //fetch data
        const {text} = req.body;
        //console.log("TEXT -> ",text);

        //find sender and receiver's id
        const senderId = req.user.userId;
        const {id:receiverId} = req.query;

        // console.log("SENDER ID -> ",senderId);
        // console.log("RECEIVER ID -> ",receiverId);

        if(!receiverId){
            return res.status(404).json({
                success:false,
                message:"Cannot find senderId"
            })
        }

        //if image is sent the upload it to cloud
        let imageUrl;
        if(req.files && req.files.image !== undefined){
            const image = req.files.image;
            const response = await imageUploader(image,process.env.FOLDER_NAME);

            imageUrl = response?.secure_url;
        }

        const createMessage = await Message.create({
            senderId:senderId,
            receiverId:receiverId,
            text:text,
            image:imageUrl,
            createdAt:Date.now()
        })
        
        if(!createMessage){
            return res.status(404).json({
                success:false,
                message:"Message not created"
            })
        }

        //Real time functionality
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",createMessage);
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Message sent successfully",
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getUserDetails = async(req,res) => {
    try{
        const {userId:userId} = req.query;

        if(!userId){
            return res.status(404).json({
                success:false,
                message:"UserID not found"
            })
        }

        const userDetails = await User.findById({_id:userId});

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Cannot find user details"
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            data:userDetails
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}