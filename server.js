require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./src/routes/movieRoutes");

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/movies", movieRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));