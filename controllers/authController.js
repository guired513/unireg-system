const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
  res.render("login", { title: "Login" });
};

exports.getRegister = (req, res) => {
  res.render("register", { title: "Register" });
};

exports.postRegister = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    req.flash("error", "Passwords do not match.");
    return res.redirect("/register");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "Email already registered.");
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Place this block here:
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "student", // 🔐 force default role
    });

    await newUser.save();

    req.flash("success", "Registered successfully. Please log in.");
    res.redirect("/login");

  } catch (err) {
    console.error(err);
    req.flash("error", "Registration failed.");
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
