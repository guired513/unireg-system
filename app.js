require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// DB CONNECT
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// EJS and Public Assets
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });

  const expressLayouts = require("express-ejs-layouts");
  app.use(expressLayouts);
  app.set("layout", "layouts/layout"); // Set default layout


// ROUTES
const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

// 404 fallback
app.use((req, res) => res.status(404).render("404"));


const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

// Export app
module.exports = app;
