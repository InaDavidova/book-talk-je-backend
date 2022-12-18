const { login } = require("../services/auth");
const mapErrors = require("../util/mapErrors");

module.exports = {
  get(req, res) {
    res.render("login", { title: "Login Page" });
  },
  async post(req, res) {
    let { email, password } = req.body;

    email = email.trim();
    password = password.trim();

    try {
      if (!email || !password) {
        throw new Error("All fields are required!");
      }

      const user = await login(email, password);

      req.session.user = {
        id: user._id,
        email: user.email,
        username: user.username,
      };

      res.redirect("/");
    } catch (err) {
      const errors = mapErrors(err);
      res.render("login", {
        error: errors[0],
        user: { email, password },
        title: "Login Page",
      });
    }
  },
};
