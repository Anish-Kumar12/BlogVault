import express from "express";
import connectDB from "./lib/connectDb.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";

// Resolve __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Middleware

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL, // Set this to your production client URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};
// app.use(cors(corsOptions));

// Middleware
app.use(clerkMiddleware());
app.use(express.json());

// Static file serving
app.use(express.static(path.join(__dirname, "Client/dist")));

// API Routes
app.use("/users", userRouter);
app.use("/posts", postRouter); // Corrected the route from "/poste" to "/posts"
app.use("/comments", commentRouter);
app.use("/webhooks", webhookRouter);

// SPA Fallback Route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Client/dist/index.html"));
});

// Error Handling Middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: process.env.NODE_ENV === 'production' ? {} : error.stack, // Hide stack trace in production
  });
});

// Connect to Database and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
