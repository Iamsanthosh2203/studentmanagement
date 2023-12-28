const User = require("../models/User");
const Task = require("../models/Task");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if the provided credentials match the hardcoded admin credentials
    if (email === "admin@admin.com") {
      const isPasswordMatch = await bcrypt.compare(
        password,
        "$2b$10$KCNlrHNeF8TYWP3hLNyXZOv1aZXi6riPCTQaYmDjqcdSScLSB0iAq"
      );

      if (isPasswordMatch) {
        // Authentication successful
        const user = {
          email: "admin@admin.com",
          role: "admin",
          // Add any other necessary admin details
        };

        // Generate a token for the admin
        const token = jwt.sign({ user }, "your_secret_key", {
          expiresIn: "1h",
        });

        res.json({ user, token });
      } else {
        // Incorrect password
        res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      // User not found
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Admin authentication error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json({
      results: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      department,
      role: "student",
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const { title, description, dueTime, assignedTo } = req.body;

    // Check if the assigned student exists
    const studentExists = await User.exists({
      _id: assignedTo,
      role: "student",
    });
    if (!studentExists) {
      return res.status(404).json({ error: "Assigned student not found" });
    }

    // Create the task
    const task = await Task.create({
      title,
      description,
      dueTime,
      assignedTo,
      status: "pending",
    });

    res.json(task);
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find the student before deletion
    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Delete the student
    await User.findByIdAndDelete(studentId);

    // Send the deleted student object in the response
    res.json(student);
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
