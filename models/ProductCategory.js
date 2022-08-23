const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  categoryName: {
    type: String,
    default: "",
    trim: true,
  },
  categoryDesc: {
    type: String,
    default: "",
    trim: true,
  },
  image: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const category = mongoose.model("Category", categorySchema);
module.exports = category;
