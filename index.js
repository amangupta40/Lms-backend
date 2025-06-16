import express from "express";
import { connectToDb } from "./config/db.js";
import bookRouter from './routes/bookRoutes.js'
import authRoutes from './routes/userRoutes.js'


const app = express();
const PORT=5003;


connectToDb();
app.use(express.json());
app.get("/api/test", (req,res) =>{
    res.json({
        success:true,
        message:"This is test route",
    })
})

app.use("/api/books",bookRouter);
app.use("/api/auth",authRoutes);
// app.use('/api/books', bookRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
    
})