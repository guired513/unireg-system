const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  name: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // now points to a faculty account
  schedule: {
    day: String,
    start: String, // "08:00"
    end: String,   // "10:00"
  },
});

module.exports = mongoose.model("Section", sectionSchema);
