const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: String,
  code: String, // e.g., BSIT
});

module.exports = mongoose.model("Program", programSchema);
