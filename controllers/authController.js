const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
  res.render("login", { title: "Login" });
};

exports.getRegister = (req, res) => {
  res.render("register", { title: "Register" });
};

exports.postRegister = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    req.flash("info", "Registration successful. Please log in.");
    res.redirect("/login");
  } catch (err) {
    req.flash("error", "User already exists.");
    res.redirect("/register");
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    req.flash("error", "Invalid credentials");
    return res.redirect("/login");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    req.flash("error", "Invalid credentials");
    return res.redirect("/login");
  }

  req.session.user = user;
  res.redirect("/dashboard");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
