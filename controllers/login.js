const { login } = require("../services/auth");
const mapErrors = require("../util/mapErrors");
const validateRequiredFields = require("../util/validateRequiredFields");

module.exports = {
  get(req, res) {
    res.render("login", { title: "Login Page" });
  },
  async post(req, res) {

    // Change identifier (email/username)
    
    let { email, password } = req.body;

    email = email.trim();
    password = password.trim();

    const requiredFieldsValidation = validateRequiredFields({
      email,
      password,
    });

    try {
      if (requiredFieldsValidation.length != 0) {
        throw requiredFieldsValidation;
      }
      
      const user = await login(email, password);

      req.session.user = {
        id: user._id,
        email: user.email,
      };

      res.redirect("/");
    } catch (err) {
      const errors = mapErrors(err);
      res.render("login", { errors, user: { email, password }, title:"Login Page" });
    }
  },
};
