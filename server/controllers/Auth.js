const validate = require("validator");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mailTemplates/passwordUpdate");
const { imageUploader } = require("../utils/imageUploader");

exports.login = async(req,res) => {
    try{
        //fetch data from req body
        const {email,password} = req.body;

        if(!validate.isEmail(email) || !password){
            return res.status(400).json({
                success:false,
                message:"Please enter valid details"
            })
        }

        //fetch in database for the user
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(404).json({
                success:false,
                message:"User doesn't exists"
            })
        }

        const payload = {
            email:existingUser.email,
            userId:existingUser._id
        }

        //matching password
        if(await bcrypt.compare(password,existingUser.password)){

            //if matched, create JWT
            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'});

            existingUser.toObject();
            existingUser.password = undefined;
            existingUser.token = token;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token:token,
                user:existingUser,
                message:"User loggedIn successfully"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is incorrect, please try again"
            })
        }

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.signup = async(req,res) => {
    try{
        //fetch details from req.body
        const {fullName,email,password,confirmPassword} = req.body;

        //check for information
        if(!fullName || !email || !password){
            return res.status(404).json({
                success:false,
                message:"Please provide all information"
            })
        }

        if(!validate.isEmail(email)){
            return res.status(400).json({
                success:false,
                message:"Please Enter valid email address"
            })
        }

        //existing user
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        //check for password
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password must be same"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            fullName:fullName,
            email:email,
            password:hashedPassword,
            profilePic:`https://api.dicebear.com/5.x/initials/svg?seed=${fullName}`,
            createdAt:Date.now()
        })

        return res.status(200).json({
            success:true,
            message:"User created successfully",
            data:user
        });

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.resetPasswordToken = async(req,res) => {
    try{
        //fetch mail for sending reset password url
        const {email} = req.body;

        if(!email){
            return res.status(404).json({
                success:false,
                message:"Please enter email address"
            })
        }

        //fetch user with given email
        const user = await User.findOne({email:email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not registered with us"
            })
        }

        //generate token
        const token = crypto.randomUUID();

        //add generated token to user model
        await User.findOneAndUpdate({email:email},{token:token,resetPasswordExpires:Date.now() + 5*60*1000},{new:true});

        //create url
        const url = `http://localhost:3000/reset-password/${token}`

        //send mail to user containing url for reseting password
        mailSender(email,"Password reset link",`click on link to reset password -> ${url}`);

        //return response
        return res.status(200).json({
            success:true,
            message:"Please check mail for password reset link",
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.resetPassword = async(req,res) => {
    try{
        //fetch details request's body
        const {password,confirmPassword,token} = req.body;

        //check if information is provided
        if(!password || !confirmPassword || !token){
            return res.status(404).json({
                success:false,
                message:"Cannot fetch all details"
            })
        }

        //check if password and confirm password is same or not
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password must be same"
            })
        }

        //find user details with provided token
        const userDetails = await User.findOne({token:token});

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User cannot be fetched with given token"
            })
        }

        //check whether token is expired or not
        if(userDetails?.resetPasswordExpires < Date.now()){
            return res.status(404).json({
                success:false,
                message:"Token expired, please regenerate token"
            })
        }

        //hash the new password
        const hashedPassword = await bcrypt.hash(password,10);

        //add new password in user'd data
        const updatedDetails = await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});

        //send mail to user confirming for passeword updated
        mailSender(userDetails.email,`Password Updated for ${userDetails?.email}`,passwordUpdated(userDetails?.email,userDetails?.fullName));

        //return response
        return res.status(200).json({
            success:true,
            message:"Password updated successfully",
            data:updatedDetails
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            mesage:error.mesage
        })
    }
}

exports.updateProfilePic = async(req,res) => {
    try{
        const userId = req.user.userId;
        //console.log(userId);

        const profilePic = req.files.profileImage;

        if(!profilePic){
            return res.status(404).json({
                success:false,
                message:"Please provide new image"
            })
        }

        const response = await imageUploader(profilePic,process.env.FOLDER_NAME);

        if(!response){
            return res.status(400).json({
                success:false,
                message:"Couldn't upload to cloud"
            })
        }
        console.log("Image upload response -> ",response);

        const updatedDetails = await User.findOneAndUpdate({_id:userId},{profilePic:response.secure_url},{new:true});

        if(!updatedDetails){
            return res.status(400).json({
                success:false,
                message:"Cannot find and update user"
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Profile picture updated succesfully",
            data:updatedDetails
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}