import { UserModel } from "../models/userModels.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req,res) =>{
    try {
        const reqBody = req.body;
        const foundUser = await UserModel.find({email:reqBody.email});
        if(foundUser.length>0){
            return res.json({
                success:false,
                message:`User with email : ${reqBody.email} already exits`,
            })
        }
        const newUser = await UserModel.create(reqBody);
        return res.json({
            success:true,
            data:newUser,
            message:`Dear ${newUser.name},Welcome to library management system.`
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message,
        })
        
    }
}

export const loginUser = async (req,res) =>{
    try {
        const reqBody = req.body;
        const foundUser = await UserModel.findOne({email: reqBody.email});
        console.log(foundUser);
        
        if(!foundUser){
            return res.json({
                success:false,
                message:'Invalid credentials',
            })
        }

        const isPasswordMatched =await  foundUser.isPasswordValid(reqBody.password);
        if(isPasswordMatched){
           const token= await generateToken({_id: foundUser?._id});

           if(!token){
            res.json({
                success:false,
                message:'Something went wrong',
            })
           }

            const userData = {
                name:foundUser.name,
                email: foundUser.email,
                address: foundUser.address,
                phoneNumber: foundUser.phoneNumber,
                token:token
            }
            return res.json({
                success:true,
                data:userData,
                message:`welcome back ${foundUser.name}`
            })
        }

        res.json({
            success:false,
            message:'Invalid credentials',
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message,
        })
        
        
    }
}

export const updateUser=async(req,res)=>{
    try {
        const {id:userId}=req.params;
        const reqBody=req.body;
        const foundUser=await UserModel.findById(userId)
        if(foundUser){
            const updateUser=await UserModel.findByIdAndUpdate(userId,reqBody,{new:true})
          return  res.json({
                success:true,
                data:updateUser
            })
        }
        res.json({
            success:false,
            message:`User wirg id ${userId} not found!`,
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

export const deleteUser=async(req,res)=>{
    try {
        const {id:userId}=req.params;
        const foundUser=await UserModel.findById(userId);
        if(foundUser){
            await UserModel.findByIdAndDelete(userId);
            res.json({
                success:true,
                message:`User with id :${userId} has been deleted!`,
            })
        }
        
    } catch (error) {
        console.log(error);
        res.json({
            success:true,
            message:error.message
        })
    }

}