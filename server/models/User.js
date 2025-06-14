const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
