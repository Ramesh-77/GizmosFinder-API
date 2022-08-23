const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    //   image/pic storing destination
    cb(null, "./Stores");
  },
  filename: function(req, file, cb) {
    console.log(file);
    //   for file name
    cb(null, Date.now() + '_' + file.originalname);
  },
});
// for filtering the files

const upload = multer({
  storage: storage
  // fileFilter: fileFilter,
});
module.exports = upload;
