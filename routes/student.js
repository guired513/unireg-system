const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { requireLogin, requireRole } = require("../middleware/auth");

router.get("/enroll", requireLogin, requireRole("student"), studentController.getEnrollmentPage);
router.post("/enroll", requireLogin, requireRole("student"), studentController.postEnroll);

module.exports = router;
