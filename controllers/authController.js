const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  res.render("login", { title: "Login" });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    req.flash("error", "Invalid email or password");
    return res.redirect("/auth/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    req.flash("error", "Invalid email or password");
    return res.redirect("/auth/login");
  }

  req.session.user = user;

  // Role-based redirect
  switch (user.role) {
    case "superadmin":
      return res.redirect("/admin/dashboard");
    case "registrar":
      return res.redirect("/registrar/dashboard");
    case "faculty":
      return res.redirect("/faculty/dashboard");
    case "student":
      return res.redirect("/student/dashboard");
    default:
      return res.redirect("/");
  }
};

exports.getRegister = (req, res) => {
  res.render("register", { title: "Register" });
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    req.flash("error", "Email already exists");
    return res.redirect("/auth/register");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: "student", // default user role is student
  });

  await newUser.save();
  req.flash("success", "Account created. Please log in.");
  res.redirect("/auth/login");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};
