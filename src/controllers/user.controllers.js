import jwt from "jsonwebtoken";
import User from "../models/user.models.js"
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import fs from "fs";

const generateAccessToken = (user)=>{
    return jwt.sign({email:user.email},process.env.ACCESS_TOKEN,{
        expiresIn: '6h' 
    })
}

const generateRefreshToken = (user)=>{
    return jwt.sign({email:user.email},process.env.REFRESH_TOKEN,{
        expiresIn: '7d'
    })
}

const uploadImgToCloudinary = async (filePath) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
    console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log(process.env.CLOUDINARY_API_KEY);
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
          resource_type: "auto",
        });
        fs.unlinkSync(filePath);
        return uploadResult.secure_url;
      } catch (error) {
        fs.unlinkSync(filePath);
        return null;
      }
};

const register = async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name) return res.status(404).json({message : "Please enter a name"})       
    if(!email) return res.status(404).json({message : "Please enter a email"})        
    if(!password) return res.status(404).json({message : "Please enter a password"})

    const user = await User.findOne({email: email})   
    if(user) return res.status(400).json({message : "Email already exists"})

    const imageUrl = await uploadImgToCloudinary(req.file.path)
    const userCreate = await User.create({
        name,
        email,
        password,
        profileImage: imageUrl
    })

    res.status(200).json({
        message : "User created successfully",
        data: userCreate,
    })
}

export {register}