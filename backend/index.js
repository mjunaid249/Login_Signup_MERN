import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/db.js";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.js";
import cors from "cors";
dotenv.config();

connectDB();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is working at http://localhost:${process.env.PORT}`);
});
