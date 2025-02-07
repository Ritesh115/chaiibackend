import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({ 
  cloud_name: 'process.env.CLOUD_NAME', 
  api_key: 'process.env.API_KEY', 
  api_secret: 'process.env.CLOUDINARY_API_SECRET' // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary  = async (localFilePath)=> {
         try {
          if(!localFilePath) return null;

    const response =  await cloudinary.uploader.upload(localFilePath)
          
    //file uploaded successfully
    console.log("file s uploaded successfully on cloudinary", response.url );

    return response;

         } catch (error) {
          
         }
} 