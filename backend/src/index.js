import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blogRoute.js"; // Ensure the correct file path
import cors from "cors";

const app = express();
dotenv.config();
const allowedOrigins = ["http://localhost:5173"]; // Frontend origin
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    code: err.code || "INTERNAL_SERVER_ERROR",
    details: err.details || null,
  });
});

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

// Mount the routes with a base path
app.use("/api/blogs", blogRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} and connected to db`);
    })
  )
  .catch((error) => {
    console.log("Error:", error.message);
  });
