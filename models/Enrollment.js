const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  section: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
