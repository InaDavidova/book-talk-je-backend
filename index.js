const express = require("express");
const initDB = require("./config/database");
const expressConfig = require('./config/express');
const { isLoggedIn, isGuest } = require("./middleware/guards");

const { home } = require("./controllers/home");
const { catalog } = require("./controllers/catalog");
const { notFound } = require("./controllers/notFound");
const { logout } = require("./controllers/logout");
const { details } = require("./controllers/details");
const { delBook } = require("./controllers/delete");
const { wish } = require("./controllers/wish");
const { profile } = require("./controllers/profile");

const login = require("./controllers/login");
const register = require("./controllers/register");
const create = require("./controllers/create");
const edit = require("./controllers/edit");


start();

async function start() {
  const app = express();
  expressConfig(app);
  await initDB();

  app.get("/", home);
  app.get("/home", home);
  app.get("/catalog", catalog);
  app.get("/logout", isLoggedIn(), logout);
  app.get("/details/:id", details);
  app.get("/delete/:id",isLoggedIn(), delBook);
  app.get("/wish/:id", isLoggedIn(), wish);
  app.get("/profile", isLoggedIn(), profile);

  app.route("/login")
  .get(isGuest(), login.get)
  .post(isGuest(), login.post);

  app.route("/register")
  .get(isGuest(), register.get)
  .post(isGuest(), register.post);

  app.route("/create")
  .get(isLoggedIn(), create.get)
  .post(isLoggedIn(), create.post);

  app.route("/edit/:id")
  .get(isLoggedIn(), edit.get)
  .post(isLoggedIn(), edit.post);

  app.all("*", notFound);

  app.listen(3000, () => console.log("Server started at port 3000"));
}