import "dotenv/config"; // Load environment variables
import express from "express";
import mongoose from "mongoose";
import AuthRouter from "./routes/auth.route.js";
import MessageRouter from "./routes/message.route.js";
import cookieParser from 'cookie-parser'
import cors from "cors";


const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from any origin
      callback(null, origin || "*");
    },
    credentials: true, // Allow credentials like cookies
  })
);


// Use PORT from .env or default to 3000
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using MONGODB_URI from .env
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err.message);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Hello, Server is running!");
});

app.use('/api/v1/auth',AuthRouter);
app.use('/api/v1/message',AuthRouter);

// Start the server
app.listen(PORT, () => {
  console.log(` Server is running on PORT: ${PORT}`);
});
