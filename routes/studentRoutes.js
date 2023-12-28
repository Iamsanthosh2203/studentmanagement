const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/tasks", authMiddleware, studentController.getTasks);
router.post(
  "/change-task-status",
  authMiddleware,
  studentController.changeTaskStatus
);
router.post("/login", studentController.studentLogin);

module.exports = router;
