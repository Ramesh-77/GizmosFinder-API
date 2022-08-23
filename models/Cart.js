const mongoose = require("mongoose");

const schema = mongoose.Schema;

const cartSchema = new schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productQuantity: {
    type: Number,
  },
  AddedAt: {
    type: Date, 
    default: Date.now()
  }
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
