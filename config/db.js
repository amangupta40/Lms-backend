import mongoose from "mongoose";

export const connectToDb = async() => {
    try {
        const response = await mongoose.connect("mongodb://localhost:27017/lms");
        console.log(response.connection.name);
        
    } catch (error) {
        console.log(error);
        
    }
}

