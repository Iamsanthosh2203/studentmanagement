const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const cors = require("cors");

// Initialize dotenv
dotenv.config();

// Initialize express
const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env.PORT);

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Enable CORS for all routes
app.use(cors());

// Routes
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
