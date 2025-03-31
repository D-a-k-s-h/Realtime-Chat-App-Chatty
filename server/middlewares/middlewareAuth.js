const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req,res,next) => {
    try{
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(404).json({
                success:false,
                message:"Token not found"
            })
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;

        } catch(error){
            return res.status(500).json({
                success:false,
                message:"Token cannot be verified"
            })
        }

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Token cannot be verified"
        })
    }
    next();
}