const router = require("express").Router();
const {
  userRegister,
  emailVerification,
  userLogin,
  googleLogin,
  facebookLogin,
} = require("../controllers/user");
const upload = require("../Uploads/upload");

// all routes for user
router.post("/register", upload.single("image"), userRegister);
router.get("/register:id/verify/:token", emailVerification);
router.post("/login", userLogin);
router.post("/google-login", googleLogin);
router.post("/facebook-login", facebookLogin);

module.exports = router;
