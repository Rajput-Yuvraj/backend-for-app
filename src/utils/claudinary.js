import {v2 as claudinary} from "cloudinary";
import { response } from "express";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLAUDINARY_CLOUD_NAME, 
    api_key: process.env.CLAUDINARY_API_KEY, 
    api_secret: process.env.CLAUDINARY_API_SECRET
});


const uploadOnClaudinary = async (localFilePath)=> {
    try {
        if(!localFilePath) return null
        const response= await claudinary.uploader.upload(localFilePath, {
            resource_type="auto"
        })
        console.log("file is upload on claudinary",response.url);
        return response;

    } catch(error) {
        fs.unlinkSync(localFilePath )//remove the locally saved temp file as the upload operation failed
        return null;
    }
}

export {uploadOnClaudinary}

// const uploadResult = await cloudinary.uploader
//     .upload(
//         'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//         public_id: 'shoes',
//         }
//     )
//     .catch((error) => {
//         console.log(error);
//     });
    
// console.log(uploadResult);