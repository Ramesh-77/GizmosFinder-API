const Category = require("../models/ProductCategory");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// category added
exports.addProductCategory = async (req, res) => {
  let category = await new Category({
    ...req.body,
    image: req.file.path,
  });
  category
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Product Category is added successfully",
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

//view
exports.viewProductCategory = async (req, res) => {
  await Category.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
//category updated
exports.updateProductCategory = async (req, res) => {
  let updateCategory = await Category.updateOne(
    { _id: req.body.pcid },
    {
      ...req.body,
    }
  );
  updateCategory.then(() => {
    res
      .status(200)
      .json({
        success: true,
        message: "product category updated successfully",
      })
      .catch((err) => {
        res.json(err);
      });
  });
};

// / productadd added
exports.addProduct = async (req, res) => {
  let product = await new Product({
    ...req.body,
    image: req.file.path,
  });
  product
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Product is added successfully",
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

//all products
exports.viewProduct = async (req, res) => {
  await Product.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

//only phones
exports.viewPhoneProduct = async (req, res) => {
  await Product.find({ categoryName: "Phone" })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

// only laptop
exports.viewLaptopProduct = async (req, res) => {
  await Product.find({ categoryName: "Laptop" })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

// only laptop
exports.viewHeadphoneProduct = async (req, res) => {
  await Product.find({ categoryName: "Headphone & Earphone" })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

//for single product
exports.viewSingleProduct = function (req, res) {
  const id = req.params.pid;
  Product.findOne({ _id: id })
    .then(function (result) {
      res.json(result);
    })
    .catch(function () {
      res.json({ message: "ok invalid" });
    });
};

exports.deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.pid })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "You have deleted product successfully",
      });
    })
    .catch(() => {
      res.status(409).json({
        message: "Something went wrong",
      });
    });
};

// search product
exports.searchProduct = async (req, res) => {
  console.log(req.params.query);
  const keys = new RegExp(req.params.query, "i");
  // console.log(keys)
  const search = await Product.find({
    $or: [{ pname: { $in: [keys] } }, { categoryName: { $in: [keys] } }],
  });

  res.json(search);
};

// add to cart
exports.addToCart = async (req, res) => {
  await new Cart({
    productId: req.body.pid,
    userId: req.body.userId,
    productQuantity: req.body.productQuantity,
  })
    .save()
    .then((data) => {
      console.log(data);
      res.status(200).json({
        success: true,
        message: "Selected product successfully added to cart",
        data,
      });
    })
    .catch((err) => {
      res.status(409).send(err);
    });
};

//get product
exports.getProductCart = async (req, res) => {
  const cart = await Cart.find({ userId: req.params.userId }).populate(
    "productId"
  );
  res.json(cart);
};

exports.deleteProductCart = (req, res) => {
  Cart.deleteOne({ _id: req.params.pid })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateProductCartQty = async (req, res) => {
  await Cart.findOneAndUpdate(
    { productId: req.params.pid },
    {
      productQuantity: req.body.productQuantity,
    }
  )
    .then((result) => {
      console.log(req.body);
      console.log(req.params.pid);
      console.log(result);
      res.status(200).json({
        message: "You have successfully updated product in cart",
        success: true,
        data: result,
      });
    })
    .catch(() => {
      res.status(200).json({
        message: "something went wrong",
      });
    });
  // console.log(req.body);
};

exports.deleteProductAfterPayment =  (req, res) => {
   Cart.deleteOne({ userId: req.body.userId })
    .then((res) => {
      console.log("deleted", res);
    })
    .catch((err) => {
      res.json(err);
    });
};
