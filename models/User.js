// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: String,
  role: { type: String, enum: ["admin", "student"] },
});

// Compare Password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT Token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.SECRET); // Replace 'your-secret-key' with a secure secret
};

userSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()._id;

  try {
    // Check if the Task model is defined
    const Task = mongoose.model("Task");

    // Delete associated tasks when a user is deleted
    await Task.deleteMany({ assignedTo: userId });
  } catch (error) {
    // Handle the error (e.g., log it)
    console.error("Error deleting associated tasks:", error);
  }

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  console.log("Password Comparison Result:", isMatch);
  return isMatch;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
