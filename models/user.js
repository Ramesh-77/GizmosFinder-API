const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    trim: true,
    default: "",
  },
  email: {
    type: String,
    trim: true,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const user = mongoose.model("User", userSchema);
module.exports = user;
