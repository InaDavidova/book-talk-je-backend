const { register } = require("../services/auth");
const mapErrors = require("../util/mapErrors");

module.exports = {
  get(req, res) {
    res.render("register", { title: "Register Page" });
  },
  async post(req, res) {
    let { email, username, password, rePass } = req.body;

    email = email.trim().toLowerCase();
    username = username.trim();
    password = password.trim();
    rePass = rePass.trim();

    try {
      if (!email || !username || !password || !rePass) {
        throw new Error("All fields are required!");
      } else if (password !== rePass) {
        throw new Error("Passwords don't match");
      } else if (password.length < 3) {
        throw new Error("Password has to be at least 3 characters!");
      }
      const user = await register(username, email, password);

      req.session.user = {
        id: user._id,
        email: user.email,
        username: user.username,
      };

      res.redirect("/");
    } catch (err) {
      const errors = mapErrors(err);
      res.render("register", {
        error: errors[0],
        user: { username, email, password, rePass },
        title: "Register Page",
      });
    }
  },
};
