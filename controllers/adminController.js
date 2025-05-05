// controllers/adminController.js

const User = require("../models/User");

exports.getDashboard = (req, res) => {
  res.render("admin/dashboard", { title: "Superadmin Dashboard" });
};

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.render("admin/users", { title: "User Management", users });
};

exports.getEditUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User not found");
  res.render("admin/editUser", { title: "Edit User", user });
};

exports.postEditUser = async (req, res) => {
  const { name, email, role } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, email, role });
  res.redirect("/admin/users");
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/admin/users");
};
