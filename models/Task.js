// Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueTime: Date,
  status: { type: String, enum: ["pending", "completed", "overdue"] },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
