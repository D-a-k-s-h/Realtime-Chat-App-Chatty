const cloudinary = require("cloudinary").v2;

exports.imageUploader = async(file,folder,height,quality) => {
    try{
        const options = {folder};

        if(quality){
            options.quality = quality;
        }

        if(height){
            options.height = height;
        }

        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath,options);

    } catch(error){
        console.log(error.message);
    }
}