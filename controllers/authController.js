const bcrypt = require("bcrypt");
const User = require("../models/User");

// Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      req.flash("error", "Email already exists");
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    req.flash("success", "Registration successful. Please login.");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    req.flash("error", "Registration failed");
    res.redirect("/register");
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
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

    req.session.user = {
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email
    };

    // Redirect based on role
    if (user.role === "superadmin") return res.redirect("/admin/dashboard");
    if (user.role === "registrar") return res.redirect("/registrar/dashboard");
    if (user.role === "faculty") return res.redirect("/faculty/dashboard");
    return res.redirect("/student/dashboard");

  } catch (err) {
    console.error(err);
    req.flash("error", "Login failed");
    res.redirect("/login");
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
};
