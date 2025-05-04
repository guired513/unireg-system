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
    prerequisite: req.body.prerequisite || null,
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
