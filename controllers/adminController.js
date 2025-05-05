

const Program = require("../models/Program");
const Subject = require("../models/Subject");
const Section = require("../models/Section");

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

const User = require("../models/User");

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
