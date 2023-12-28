// studentController.js
const User = require("../models/User");
const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get both completed and pending tasks
    const completedTasks = await Task.find({
      assignedTo: userId,
      status: "completed",
    }).populate("assignedTo");
    const pendingTasks = await Task.find({
      assignedTo: userId,
      status: "pending",
    }).populate("assignedTo");

    // Concatenate completed tasks and pending tasks
    const allTasks = [...completedTasks, ...pendingTasks];

    res.json({
      tasks: allTasks.length,
      completedTasks: completedTasks.length,
      pendingTasks: pendingTasks.length,
      data: allTasks,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.changeTaskStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { taskId, status } = req.body;

    // Validate if taskId is provided
    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    // Validate if status is provided
    if (!status) {
      return res.status(400).json({ error: "Task status is required" });
    }

    // Update the task status for the logged-in user
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, assignedTo: userId },
      { status },
      { new: true }
    );

    // Check if the task was found and updated
    if (!updatedTask) {
      return res.status(404).json({
        error: "Task not found or not assigned to the logged-in user",
      });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // Find the student by email
    const student = await User.findOne({ email, role: "student" });

    // Check if the student exists
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Compare passwords using the comparePassword method
    const isPasswordMatch = await student.comparePassword(password);

    // Check if the password is correct
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate and send JWT token
    const token = student.generateAuthToken();
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
