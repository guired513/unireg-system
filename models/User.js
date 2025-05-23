const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "faculty", "registrar", "superadmin"],
    default: "student"
  },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model("User", userSchema);
