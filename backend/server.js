import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from './routes/auth.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes)

// Health Check
app.get("/", (req, res) => {
  res.send("SkillSwap API is running");
});

// Connect to MongoDB and start the server
const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT}`);
  });
};

startServer();
