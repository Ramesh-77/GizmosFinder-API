const router = require("express").Router();
const { addProductCategory, updateProductCategory } = require("../controllers/productCategory");

//routes for products
router.post("/add", addProductCategory);
router.put("/update-category/:pcid", updateProductCategory);

module.exports = router;