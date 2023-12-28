// adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

router.post("/login", adminController.adminLogin);
router.get("/students", adminAuthMiddleware, adminController.getStudents);
router.post("/add-student", adminController.addStudent);
router.post("/assign-task", adminController.assignTask);
router.delete("/delete-student/:studentId", adminController.deleteStudent);

module.exports = router;
