const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    minlength: [4, "Username needs to be at least 4 characters!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    minlength: [10, "Email needs to be at least 10 characters!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    // minlength: will not work, because after hashing the password will have a different length //
  },
});

const User = model("User", userSchema);

module.exports = User;