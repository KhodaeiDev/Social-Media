const express = require("express");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { setHeaders } = require("./middlewares/headers");
const { errorHandler } = require("./middlewares/errorHandler");
const homeRoutes = require("./modules/home/home.routes");
const authRouter = require("./modules/auth/auth.routes");
const postRouter = require("./modules/post/post.routes");
const pageRouter = require("./modules/pages/page.routes");
const userRouter = require("./modules/user/user.routes");
const swaggerApiDoc = require("./modules/api-document/swagger.routes");
require("dotenv").config();

const app = express();

//* Body Parser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

//* cookie Parser
app.use(cookieParser());

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
app.use("/js", express.static(path.join(__dirname, "./Functions")));
app.use("/fonts", express.static(path.join(__dirname, "./../public/fonts")));
app.use("/images", express.static(path.join(__dirname, "./../public/images")));

// template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", homeRoutes);
app.use("/api-doc", swaggerApiDoc);
app.use("/auth", authRouter);
app.use("/pages", pageRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);

// 404 Error handler
app.use((req, res) => {
  console.log("this is Path Not Found =>", req.path);
  res.status(404).json({ message: "Page Not found" });
});

// todo
// app.use(errorHandler);

module.exports = app;
