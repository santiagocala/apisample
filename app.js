var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var movieRouter = require('./routes/movie');
var indexRouter = require('./routes/index'); 

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/movies", movieRouter);
app.use("/api", indexRouter);

module.exports = app;
