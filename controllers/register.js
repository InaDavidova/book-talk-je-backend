const { register } = require("../services/auth");
const mapErrors = require("../util/mapErrors");
const validateRequiredFields = require("../util/validateRequiredFields");

module.exports = {
  get(req, res) {
    res.render("register", { title: "Register Page" });
  },
  async post(req, res) {

    // Change to requred fields

    let { firstName, lastName, email, password, rePass } = req.body;

    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim().toLowerCase();
    password = password.trim();
    rePass = rePass.trim();

    const requiredFieldsValidation = validateRequiredFields({firstName, lastName, email, password, rePass});

    try {
      if (requiredFieldsValidation.length != 0) {
        throw requiredFieldsValidation;

      } else if (password !== rePass) {
        const error = {
          name: "customError",
          field: "rePass",
          message: "Passwords don't match",
        };
        throw error;

      } else if (password.length < 4) {
        const error = {
          name: "customError",
          field: "password",
          message: "Password has to be at least 4 characters!",
        };
        throw error;
      }
      const user = await register(firstName, lastName, email, password);

      req.session.user = {
        id: user._id,
        email: user.email,
      };

      res.redirect("/");
    } catch (err) {
      const errors = mapErrors(err);
      res.render("register", {
        errors,
        user: { firstName, lastName, email, password, rePass },
        title:"Register Page"
      });
    }
  },
};
