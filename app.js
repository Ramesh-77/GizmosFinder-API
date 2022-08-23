// const cookieSession = require("cookie-session");
const express = require("express");
// const passport = require("passport");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// importing database
require("./database/db");

// require("./auths/passport");
//to receive body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());

app.use(express.static(__dirname + "/"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.status(200).json({});
  }
  next();
});


// import user router
const userRouter = require("./routes/user");
app.use("/user", userRouter);

const productCategory = require("./routes/productCategory")
app.use(productCategory)



const port = process.env.PORT || 8080;
const host = process.env.HOST_NAME;

app.listen(port, host, () => {
  console.log(`Server is listening at ${host}: ${port}`);
});
