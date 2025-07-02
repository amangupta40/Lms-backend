import { UserModel, validateUserSchema } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const reqBody = req.body;

    const validatedUser = validateUserSchema.validate(reqBody);

    if (validatedUser.error) {
      return res.Status(400).json({
        success: false,
        message: validatedUser.error.message,
      });
    }

    const foundUser = await UserModel.find({ email: reqBody.email });

    if (foundUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: `User with email: ${reqBody.email} already exists`,
      });
    }

    // const newUserInfo = {
    //   email: reqBody.email,
    //   phoneNumber: reqBody.phoneNumber,
    //   password: reqBody.password,
    //   address: reqBody.address,
    //   name: reqBody.name,
    // };

    const newUser = await UserModel.create(validatedUser.value);
    const userData = {
      name:newUser.name,
      email:newUser.email,
      address:newUser.address,
      phoneNumber:newUser.phoneNumber,
      _id:newUser._id,
      role:newUser.role,
    }
    return res.status(201).json({
      success: true,
      data: userData,
      message: `Dear ${newUser.name}, Welcome to library management system.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const reqBody = req.body;

    const foundUser = await UserModel.findOne({ email: reqBody.email });

    console.log(foundUser);

    if (!foundUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials!!!",
      });
    }

    const isPasswordMatched = await foundUser.isPasswordValid(reqBody.password);

    if (isPasswordMatched) {
      const token = await generateToken({ _id: foundUser?._id });

      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Something went wrong!!",
        });
      }

      const userData = {
        name: foundUser.name,
        email: foundUser.email,
        address: foundUser.address,
        phoneNumber: foundUser.phoneNumber,
        token: token,
      };

      return res.status(200).json({
        success: true,
        data: userData,
        message: `Welcome back ${foundUser.name}`,
      });
    }

    res.status(400).json({
      success: false,
      message: "Invalid Credentials!!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async(req,res) =>{
  try {
    const {userId} = req.params;
    const reqBody=req.body;
    const foundUser = await UserModel.findById(userId);

    if(!foundUser){
      return res.status(400).json({
        success:false,
        message:"User not found!!"
      })
    }
      //update user start here
    
     
    if(foundUser.id.toString() !== req.user._id.toString() && !["Admin", "Staff"].includes(req.user.role)){
      return res.json({
        success:false,
        message:"You cannot update this user!"
      })
    }

    // if(foundUser.id.toString() !== req.user._id.toString() && req.user.role!=="Admin" && req.user.role!=="Staff"){
    //   return res.json({
    //     success:false,
    //     message:"You cannot update this user!"
    //   })
    // }

    const updateUser = await UserModel.findByIdAndUpdate(userId,reqBody, {new: true,});
     return res.status(200).json({
      success:true,
      data:updateUser,
      message:"Updated user succesfully!!"
     })

  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Failed updated user!!"
    })
  }
}

export const  deleteUser = async(req,res) =>{
  try {
    const {userId} = req.params;
    const reqBody=req.body;
    const foundUser = await UserModel.findById(userId);

    if(!foundUser){
      return res.status(400).json({
        success:false,
        message:"User not found!!"
      })
    }
     await UserModel.findByIdAndDelete(userId);
    return res.status(200).json({
      success:true,
      message:"User deleted successfully!!"
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Failed!! User is not deleted"
    })
  }
}

export const updatePassword = async(req,res) =>{
  try {
    const {userId} = req.params;
    const {newPassword, oldPassword} = req.body;
    const foundUser = await UserModel.findById(userId);

    if(!foundUser){
      return res.status(400).json({
        success:false,
        message:"User not found!!"
      })
    }

    if(foundUser.id.toString() !== req.user._id.toString() && !["Admin", "Staff"].includes(req.user.role)){
      return res.status(403).json({
        success:false,
        message:"You cannot update passowrd of this user!"
      })
    }

    const isPasswordMatched= await foundUser.isPasswordValid(oldPassword);
    if(!isPasswordMatched){
      return res.status(400).json({
        success:false,
        message:"Old password does not matched"
      })
    }

    foundUser.password=newPassword;
    await foundUser.save();
    const userData = {
      name:foundUser.name,
      address:foundUser.address,
      phoneNumber:foundUser.phoneNumber,
      role:foundUser.role,
      email:foundUser.email,
      _id:foundUser._id
    }

    res.status(200).json({
      success:true,
      message:"Passsword updated succcessfully",
      data:userData,
    })

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}