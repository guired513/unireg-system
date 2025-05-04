const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  name: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  instructor: String,
  schedule: {
    day: String,       // e.g., "Monday"
    start: String,     // e.g., "08:00"
    end: String        // e.g., "10:00"
  },
});

module.exports = mongoose.model("Section", sectionSchema);
