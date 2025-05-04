const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  code: String, // e.g., IT101
  title: String,
  units: Number,
  program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
  prerequisite: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", default: null },
});

module.exports = mongoose.model("Subject", subjectSchema);
