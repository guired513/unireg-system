// routes/admin.js

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { requireLogin, checkRole } = require("../middleware/auth");

router.get("/dashboard", requireLogin, checkRole("superadmin"), adminController.getDashboard);
router.get("/users", requireLogin, checkRole("superadmin"), adminController.getUsers);
router.get("/users/edit/:id", requireLogin, checkRole("superadmin"), adminController.getEditUser);
router.post("/users/edit/:id", requireLogin, checkRole("superadmin"), adminController.postEditUser);
router.post("/users/delete/:id", requireLogin, checkRole("superadmin"), adminController.deleteUser);

module.exports = router;
