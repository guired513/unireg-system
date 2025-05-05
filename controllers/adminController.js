

const Program = require("../models/Program");
const Subject = require("../models/Subject");
const Section = require("../models/Section");
const User = require("../models/User");

exports.getDashboard = async (req, res) => {
  const programs = await Program.find();
  const subjects = await Subject.find().populate("program");
  const sections = await Section.find().populate("subject");
  res.render("admin/dashboard", { programs, subjects, sections });
};

exports.addProgram = async (req, res) => {
  await Program.create({ name: req.body.name, code: req.body.code });
  res.redirect("/admin");
};

exports.addSubject = async (req, res) => {
  await Subject.create({
    code: req.body.code,
    title: req.body.title,
    units: req.body.units,
    program: req.body.programId,
  });
  res.redirect("/admin");
};

exports.addSection = async (req, res) => {
  await Section.create({
    name: req.body.name,
    subject: req.body.subjectId,
    instructor: req.body.instructor,
    schedule: {
      day: req.body.day,
      start: req.body.start,
      end: req.body.end,
    },
  });
  res.redirect("/admin");
};



exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.render("admin/users", { users });
};

exports.updateRole = async (req, res) => {
  await User.findByIdAndUpdate(req.body.userId, { role: req.body.role });
  res.redirect("/admin/users");
};

exports.toggleStatus = async (req, res) => {
  const user = await User.findById(req.body.userId);
  user.isActive = !user.isActive;
  await user.save();
  res.redirect("/admin/users");
};

// controllers/adminController.js
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { role });
    res.redirect("/admin/users");
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).send("Server Error");
  }
};


exports.updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const newRole = req.body.role;

    await User.findByIdAndUpdate(userId, { role: newRole });
    req.flash("success_msg", "User role updated successfully.");
    res.redirect("/admin/users");
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).send("Error updating user role.");
  }
};
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const updatedStatus = user.status === "Active" ? "Inactive" : "Active";

    await User.findByIdAndUpdate(req.params.id, { status: updatedStatus });
    req.flash("success_msg", "User status updated.");
    res.redirect("/admin/users");
  } catch (error) {
    console.error("Error toggling status:", error);
    res.status(500).send("Error updating user status.");
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const newRole = req.body.role;

    await User.findByIdAndUpdate(userId, { role: newRole });
    req.flash("success_msg", "User role updated successfully.");
    res.redirect("/admin/users");
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).send("Error updating user role.");
  }
};