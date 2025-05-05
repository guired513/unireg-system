// routes/faculty.js

const express = require("express");
const router = express.Router();
const { requireLogin, checkRole } = require("../middleware/auth");

router.get("/dashboard", requireLogin, checkRole("faculty"), (req, res) => {
  res.render("faculty/dashboard", { title: "Faculty Dashboard" });
});

module.exports = router;
