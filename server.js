import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Import routes
import orderRoutes from "./routes/Haraka/order/orderRoute.js";
import userRoutes from "./routes/user/authRoute.js"

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies


// Mount API routes
app.use("/orders", orderRoutes);
app.use("/auth", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// 404 handler for undefined routes
app.use("*", (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  res.status(404).json({
    success: false,
    message: `Route not found: ${fullUrl}`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export default app;
