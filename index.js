import express from "express";
import { connectToDB } from "./config/db.js";
import bookRouter from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 5003;

connectToDB();

app.use(express.json());

app.get("api/test", (req, res) => {
  res.json({
    success: true,
    message: "This is test route!",
  });
});

app.use("/api/books", bookRouter);

app.use("/api/auth", userRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
