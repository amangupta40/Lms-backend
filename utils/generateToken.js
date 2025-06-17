import jwt from 'jsonwebtoken';
const jwtSecretKey = 'jhskjfheiohjcsajkjkdh';
 
export const generateToken = async (user) =>{
   try {
    const token = jwt.sign(user, jwtSecretKey);

    return token;
   } catch (error) {
    console.log(error);
    return error;
   }
}