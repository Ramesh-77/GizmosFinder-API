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
// app.set('trust proxy', 1)
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["gizmos_finder"],

//     // Cookie Options
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//   })
// );

// for logging with social medias and google
// app.use(passport.initialize());
// app.use(passport.session());

//making connection with front-end
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET, POST, PUT, PATCH, DELETE",
//     credentials: true,
//   })
// );

app.use(cors());

// uploading files and images
app.use(express.static(__dirname + "/"));

// const authRouter = require("./routes/auth");
// app.use("/auth", authRouter);

// import user router
const userRouter = require("./routes/user");
app.use("/user", userRouter);

const port = process.env.PORT || 8080;
const host = process.env.HOST_NAME;

app.listen(port, host, () => {
  console.log(`Server is listening at ${host}: ${port}`);
});
