const mongoose = require("mongoose");

const schema = mongoose.Schema;

//creating token schema for verification
const tokenSchema = new schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600, //1hour
  },
});

module.exports = mongoose.model("Token", tokenSchema);
