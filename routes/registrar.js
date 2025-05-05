const express = require("express");
const router = express.Router();
const { requireLogin, checkRole } = require("../middleware/auth");

// Registrar dashboard
router.get("/dashboard", requireLogin, checkRole("registrar"), (req, res) => {
  res.render("registrar/dashboard", {
    title: "Registrar Dashboard",
    user: req.session.user,
  });
});

module.exports = router;
