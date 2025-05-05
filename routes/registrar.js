// routes/registrar.js

const express = require("express");
const router = express.Router();
const { requireLogin, checkRole } = require("../middleware/auth");

router.get("/dashboard", requireLogin, checkRole("registrar"), (req, res) => {
  res.render("registrar/dashboard", { title: "Registrar Dashboard" });
});

router.get("/scheduling", requireLogin, checkRole("registrar"), (req, res) => {
  res.render("registrar/scheduling", { title: "Scheduling" });
});

module.exports = router;
