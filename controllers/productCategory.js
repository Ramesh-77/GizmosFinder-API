const Category = require("../models/ProductCategory");

// category added
exports.addProductCategory = async (req, res) => {
  let category = await new Category({
    ...req.body,
  });
  category.save().then(() => {
    res
      .status(200)
      .json({
        success: true,
        message: "Product Category is added successfully",
      })
      .catch((err) => {
        res.json(err);
      });
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
