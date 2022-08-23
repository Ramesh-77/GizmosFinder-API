const mongoose = require("mongoose");

const gizmos_database = process.env.MONGOLAB_URI;

mongoose
  .connect(gizmos_database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Gizmos_Database is connecting...");
  })
  .catch((err) => {
    console.log(err);
  });
