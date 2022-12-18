const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const userSession = require("../middleware/userSession");

async function start(app) {

  app.engine(
    "hbs",
    hbs.create({
      extname: ".hbs",
    }).engine
  );
  app.set("view engine", "hbs");

  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));

  app.use(
    session({
      secret: "this is a secret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: "auto",
      },
    })
  );
  app.use(userSession());
}

module.exports = start;