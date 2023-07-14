// package imports

import express from "express";
// For handling errors
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

// files imports
import connectDB from "./config/db.js";

// Routes import
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Error Middlewares
import errorMiddleware from "./middlewares/errorMiddleware.js";

// Dot Env config
dotenv.config();

// mongodb Connection
connectDB();

// rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("uploads"));

// route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

// ValidationMiddleware
app.use(errorMiddleware);

// Port
const PORT = process.env.PORT || 8080;
// listen
app.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on port no ${PORT}`
      .bgCyan.white
  );
});
