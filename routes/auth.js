const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", (req, res) => res.render("auth/login", { error: req.flash("error"), success: req.flash("success") }));
router.post("/login", authController.login);

router.get("/register", (req, res) => res.render("auth/register", { error: req.flash("error") }));
router.post("/register", authController.register);

router.get("/logout", authController.logout);

module.exports = router;
