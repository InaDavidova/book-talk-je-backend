const express = require("express");
const initDB = require("./config/database");
const expressConfig = require('./config/express');
const { isLoggedIn, isGuest } = require("./middleware/guards");

const { home } = require("./controllers/home");
const { notFound } = require("./controllers/notFound");
const { logout } = require("./controllers/logout");

const login = require("./controllers/login");
const register = require("./controllers/register");


start();

async function start() {
  const app = express();
  expressConfig(app);
  await initDB();

  app.get("/", home);
  app.get("/home", home);
  app.get("/logout", logout);

  app.route("/login")
  .get(login.get)
  .post(login.post);

  app.route("/register")
  .get(register.get)
  .post(register.post);

  app.all("*", notFound);

  app.listen(3000, () => console.log("Server started at port 3000"));
}