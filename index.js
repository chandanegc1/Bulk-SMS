import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import mailDataRouter from "./routes/mailDataModel.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5100;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build directory
app.use(express.static(path.join(__dirname, "client", "build")));

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/mail", mailDataRouter);

// Handle all other routes and serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
