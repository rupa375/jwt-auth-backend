import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
export const signUp=async (req,res)=>{

    try{
        const {firstName,lastName,email,password,userName}=
        req.body;

        if(!firstName || !lastName || !email || !password || !userName){
             return res.status(400).json({message:"user already exist"})

        }

        let existUser=await User.findOne({email})
     
        if(existUser){
            return res.status(400).json({message:"user already exist"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
         
        const user=await User.create({
            firstName,
            lastName,
            email,
            userName,
            password:hashedPassword
        })

let token;
try{
token=generateToken(user._id)
}
catch(error){
    console.log("error",error)
}

res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENN == "production",
    sameSite:"strict",
  maxAge:7*24*60*60*1000
})

  return res.status(201).json({user:{
     firstName,
            lastName,
            email,
            userName
  }})

     }
    catch(error){
        return res.status(500).json({Message:"internal server error"})
    }

}