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
  viewPhoneProduct,
  viewSingleProduct,
  searchProduct,
  addToCart,
  getProductCart,
  deleteProductCart,
  updateProductCartQty
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

//single product
router.get("/single-product/:pid", viewSingleProduct);
//POST: Add item to cart
router.post("/add-to-cart", addToCart);
//GET: Getting products in cart
router.get("/get-products-cart/:userId", getProductCart);

router.delete("/delete-product-cart/:pid", deleteProductCart);

// for updating product qty in cart
router.put("/update-product-qty/:pid", updateProductCartQty);

//delete route for product
router.delete("/product-delete/:pid", deleteProduct);

// for searching products
router.get("/search-product/:query", searchProduct);
module.exports = router;
