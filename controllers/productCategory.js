const Category = require("../models/ProductCategory");
const Product = require("../models/Product");

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
