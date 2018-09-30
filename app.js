const express = require("express");
const mongoose = require("mongoose");
const app = express();
const apiRouter = require("./routes/api-router.js");
// const { APIKEY } =
//   process.env.NODE_ENV === "production" ? process.env : require("../config");
const { DB_URL } =
  process.env.NODE_ENV === "production" ? process.env : require("./config");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log(`connect to ${DB_URL}...`);
  });

app.get("/", (req, res, next) => {
  res.send({ Message: "Hello World" });
});

app.get("/", (req, res, next) => {
  res.sendFile(`${__dirname}/views/home.html`);
  // or use ejs render
});

app.use("/api", apiRouter);

app.get("/*", (req, res, next) => {
  next({ status: 404, msg: "Resource not found" });
});

app.use((err, req, res, next) => {
  if (err.name === "CastError" || err.status === 400)
    res.status(400).send({ msg: "Bad request" });
  else next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ msg: "Page not found" });
  else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
});

//app.use(handle400s)
//app.use(handle404s) ...

module.exports = app;
