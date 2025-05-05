// app.js

const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// ENV or hardcoded for dev
mongoose.connect("mongodb://localhost:27017/unireg-system")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed", err));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(flash());
app.use(expressLayouts);

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");

// Global user for navbar access
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
const authController = require("./controllers/authController");
const adminRoutes = require("./routes/admin");
const registrarRoutes = require("./routes/registrar");
const facultyRoutes = require("./routes/faculty");
const studentRoutes = require("./routes/student");

app.get("/", (req, res) => res.render("index", { title: "Welcome to UniReg" }));
app.get("/login", authController.getLogin);
app.post("/login", authController.postLogin);
app.get("/register", authController.getRegister);
app.post("/register", authController.postRegister);
app.get("/logout", authController.logout);

app.use("/admin", adminRoutes);
app.use("/registrar", registrarRoutes);
app.use("/faculty", facultyRoutes);
app.use("/student", studentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send("Not Found");
});

module.exports = app;
