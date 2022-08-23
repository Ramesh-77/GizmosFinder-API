const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  shopOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pname: {
    type: String,
    default: "",
    trim: true,
  },
  pdesc: {
    type: String,
    default: "",
    trim: true,
  },
  pprice: {
    type: Number,
    default: "",
    trim: true,
  },
  pqty: {
    type: Number,
    default: 1,
    trim: true,
  },
  category: {
    type: String,
  },

  image: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const product = mongoose.model("Product", productSchema);
module.exports = product;
