import { UserModel, validateUserSchema } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const reqBody = req.body;

    const validatedUser = validateUserSchema.validate(reqBody);

    if (validatedUser.error) {
      return res.json({
        success: false,
        message: validatedUser.error.message,
      });
    }

    const foundUser = await UserModel.find({ email: reqBody.email });

    if (foundUser.length > 0) {
      return res.json({
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

    return res.json({
      success: true,
      data: newUser,
      message: `Dear ${newUser.name}, Welcome to library management system.`,
    });
  } catch (error) {
    console.log(error);
    res.json({
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
      return res.json({
        success: false,
        message: "Invalid Credentials!!!",
      });
    }

    const isPasswordMatched = await foundUser.isPasswordValid(reqBody.password);

    if (isPasswordMatched) {
      const token = await generateToken({ _id: foundUser?._id });

      if (!token) {
        return res.json({
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

      return res.json({
        success: true,
        data: userData,
        message: `Welcome back ${foundUser.name}`,
      });
    }

    res.json({
      success: false,
      message: "Invalid Credentials!!!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
