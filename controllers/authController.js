// controllers/authController.js

const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getLogin = (req, res) => {
  res.render("login", { title: "Login" });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.redirect("/login");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.redirect("/login");

  req.session.user = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  if (user.role === "superadmin") return res.redirect("/admin/dashboard");
  if (user.role === "registrar") return res.redirect("/registrar/dashboard");
  if (user.role === "faculty") return res.redirect("/faculty/dashboard");
  if (user.role === "student") return res.redirect("/student/dashboard");

  res.redirect("/");
};

exports.getRegister = (req, res) => {
  res.render("register", { title: "Register" });
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: "student", // default role
  });

  await newUser.save();
  res.redirect("/login");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
