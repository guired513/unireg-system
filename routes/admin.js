const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { requireLogin, requireRole } = require("../middleware/auth");

router.get("/", requireLogin, requireRole("admin"), adminController.getDashboard);
router.post("/programs", requireLogin, requireRole("admin"), adminController.addProgram);
router.post("/subjects", requireLogin, requireRole("admin"), adminController.addSubject);
router.post("/sections", requireLogin, requireRole("admin"), adminController.addSection);

module.exports = router;
