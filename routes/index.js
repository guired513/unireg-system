
const express = require("express");
const router = express.Router();

const { requireLogin } = require("../middleware/auth");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'University Registration System' });
});

router.get("/dashboard", requireLogin, (req, res) => {
  const role = req.session.user?.role;
  console.log("Logged-in role:", role);

  if (role === "superadmin") return res.redirect("/admin/users");
  if (role === "admin") return res.redirect("/admin");
  if (role === "registrar") return res.redirect("/registrar/schedule");
  if (role === "faculty") return res.redirect("/faculty/sections");
  if (role === "student") return res.redirect("/student/enroll");

  res.status(403).send("Unknown role or not authorized.");
});


module.exports = router;
