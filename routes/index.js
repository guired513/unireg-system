var express = require('express');
var router = express.Router();

const { requireLogin } = require("../middleware/auth");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'University Registration System' });
});

router.get("/dashboard", requireLogin, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});

module.exports = router;
