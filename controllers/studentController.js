const Section = require("../models/Section");
const Enrollment = require("../models/Enrollment");

exports.getEnrollmentPage = async (req, res) => {
  const sections = await Section.find().populate("subject instructor");
  const enrolled = await Enrollment.find({ student: req.session.user._id }).populate({
    path: "section",
    populate: ["subject", "instructor"],
  });
  res.render("student/enroll", { sections, enrolled });
};

exports.postEnroll = async (req, res) => {
  const studentId = req.session.user._id;
  const sectionId = req.body.sectionId;

  const selectedSection = await Section.findById(sectionId);
  const currentEnrollments = await Enrollment.find({ student: studentId }).populate("section");

  const hasConflict = currentEnrollments.some(enrollment => {
    const existing = enrollment.section.schedule;
    return (
      existing.day === selectedSection.schedule.day &&
      existing.start < selectedSection.schedule.end &&
      selectedSection.schedule.start < existing.end
    );
  });

  if (hasConflict) {
    req.flash("error", "Schedule conflict detected. Please choose a different section.");
    return res.redirect("/student/enroll");
  }

  await Enrollment.create({ student: studentId, section: sectionId });
  req.flash("info", "Successfully enrolled!");
  res.redirect("/student/enroll");
};
