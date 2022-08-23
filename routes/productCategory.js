const router = require("express").Router();
const {
  updateProductCategory,
  addProductCategory,
  viewProductCategory,
  addProduct,
  viewProduct, 
  deleteProduct, 
  viewLaptopProduct,
  viewHeadphoneProduct,
  viewPhoneProduct
} = require("../controllers/productCategory");
const path = require("path");
const upload = require("../Uploads/upload");

//routes for products category

router.post(
  "/add-product-category",
  upload.single("image"),
  addProductCategory
);

router.get("/all-product-category", viewProductCategory);

router.put("/update-category/:pcid", updateProductCategory);

//for product
router.post("/add-product", upload.single("image"), addProduct);

router.get("/all-products", viewProduct);
router.get("/all-phone", viewPhoneProduct);
router.get("/all-laptop", viewLaptopProduct);
router.get("/all-headphone", viewHeadphoneProduct);



//delete route for product
router.delete("/product-delete/:pid", deleteProduct);
module.exports = router;
