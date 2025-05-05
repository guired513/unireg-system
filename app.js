
require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");

const app = express();

// Connect DB using .env connection string
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.log("❌ MongoDB connection error", err));

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout");

// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", { layout: "layouts/layout" });
});

module.exports = app;