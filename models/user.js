const Mongoose = require("mongoose");

const userSchema = Mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  mobileNumber: {
    type: Number,
    unique: true,
  },
});

const User = Mongoose.model("User", userSchema);

module.exports = exports = User;
