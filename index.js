import express from "express";
import { connectToDB } from "./config/db.js";
import bookRouter from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const mongoURI = process.env.MONGO_URI;
const port = 5003;

connectToDB();

app.use(express.json());

app.get("api/test", (req, res) => {
  res.json({
    success: true,
    message: "This is test route!",
  });
});

app.use("/api/auth", userRoutes);

app.use("/api/books", bookRouter);

app.use("/api/transactions", transactionRoutes);

app.listen(port, () => {
  const f14daysfromNow= Date.now()+14 *24*60*60*1000;
  console.log(
    new Date(f14daysfromNow).toTimeString(),
    new Date(f14daysfromNow).toDateString(),
    new Date(f14daysfromNow).toISOString()
  );
  
  console.log(`Server running on ${port}`);
 
});
