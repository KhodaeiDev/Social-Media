const express = require("express");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const { setHeaders } = require("./middlewares/headers");
const { errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./modules/auth/auth.routes");
require("dotenv").config();

const app = express();

// Body Parser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

//* set Flash & sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// Cors Policy
app.use(setHeaders);

// static Folder
app.use("/css", express.static(path.join(__dirname, "./../public/css")));
app.use("/js", express.static(path.join(__dirname, "./../public/js")));
app.use("/fonts", express.static(path.join(__dirname, "./../public/fonts")));
app.use("/images", express.static(path.join(__dirname, "./../public/images")));

// template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/auth", authRouter);

// 404 Error handler
app.use((req, res) => {
  console.log("this is Path Not Found =>", req.path);
  res.status(404).json({ message: "Page Not found" });
});

// todo
// app.use(errorHandler);

module.exports = app;
