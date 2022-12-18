const { Schema, model } = require("mongoose");

// Add reqiured fields and validation rules

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    minlength: [3, "Username needs to be at least 3 characters!"],
    unique: true,
    validate: [ /^[a-zA-Z0-9]+$/, "Username should only consists of letters and digits!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    // minlength: will not work, because after hashing the password will have a different length //
  },
});

const User = model("User", userSchema);

module.exports = User;