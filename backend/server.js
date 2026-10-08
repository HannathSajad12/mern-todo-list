// A1, A2, A6 - Express server, MongoDB connection and CORS
require("dotenv").config(); // loads variables from .env into process.env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

// A6 - allow ONLY the React app's address, not every origin
app.use(cors({ origin: CLIENT_ORIGIN }));

// A1 - parse JSON request bodies
app.use(express.json());

// Mount the task routes
app.use("/api/tasks", taskRoutes);

// Unknown routes -> 404 JSON
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// A2 - connect to MongoDB using the connection string from .env
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Create backend/.env (see .env.example).");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
