const User = require("../models/User");
const { hash, compare } = require("bcrypt");

// Add all filds as per reqirement. Adjust functions names.

async function getUserByEmail(email) {
  const user = await User.findOne({ email: email });
  return user;
}

async function register(username, email, password) {
  const hashedPassword = await hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  return user;
}

async function login(email, password) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const hasMatch = await compare(password, user.password);

  if (!hasMatch) {
    throw new Error("Incorrect email or password");
  }

  return user;
}

module.exports = { register, login};
