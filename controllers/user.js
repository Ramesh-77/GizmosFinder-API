const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Token = require("../models/token");
const sendEmail = require("../utils/helper");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
// const fetch = require("node-fetch")
const fetch = require("node-fetch");

const client = new OAuth2Client(
  "103948036055-74pagps1rft774arfnqqnteo35s6ebog.apps.googleusercontent.com"
);

// normal user regiter with form data
exports.userRegister = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({
        message: "User with given email is already exist!",
      });
    }
    let salt = await bcrypt.genSalt(Number(process.env.SALT));
    let hashed_pw = await bcrypt.hash(req.body.password, salt);
    user = await new User({
      ...req.body,
      // image: req.file.path,
      password: hashed_pw,
    }).save();

    let token = await new Token({
      user: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    let url = `${process.env.BASE_URL}user/register/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);
    res.status(200).send({
      message: "Email sent to your email account, please verify",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Service Error",
    });
  }
};

//verification email message send to authenticate email account
exports.emailVerification = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user)
      return res.status(400).send({
        message: "Invalid link",
      });

    //find token
    const token = await Token.findOne({
      user: user._id,
      token: req.params.token,
    });

    //if invalid token
    if (!token)
      return res.status(400).send({
        message: "Invalid link",
      });

    await User.updateOne(
      {
        _id: user._id,
      },
      {
        email_verified: true,
      }
    );

    await Token.remove();
    res.status(200).send({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

// user login with form data only
exports.userLogin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email" });
    }

    const valid_password = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!valid_password) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // if user not verified
    if (!user.email_verified) {
      let token = await Token.findOne({ user: user._id });
      if (!token) {
        token = await new Token({
          user: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}user/register/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }
      return res
        .status(400)
        .send({ message: "An Email sent to your account, please verify" });
    }

    let token = await jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerify: user.email_verified,
        role: user.role,
        phone: user.phone,
        createdAt: user.createdAt,
      },
      process.env.JWTPRIVATEKEY,
      {
        expiresIn: "7d",
      }
    );
    console.log(token);
    res.status(200).send({
      message: "login success",
      data: {
        success: true,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

//user login with google
exports.googleLogin = (req, res) => {
  const { token } = req.body;
  // console.log("first Token: " + token);
  client
    .verifyIdToken({
      idToken: token,
      aud: "103948036055-74pagps1rft774arfnqqnteo35s6ebog.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email, picture } = response.payload;
      // console.log(response.payload)

      // email is verified as true
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          // console.log(email);
          if (err) {
            return res.status(400).json({
              message: "Something went wrong",
            });
          } else {
            // if user exist in database
            if (user) {
              const token = jwt.sign(
                {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  image: user.image,
                  role: user.role,
                  email_verified: user.email_verified,
                },
                process.env.JWTPRIVATEKEY,
                {
                  expiresIn: "7d",
                }
              );
              res.status(200).send({
                message: "login success",
                data: {
                  success: true,
                  token: token,
                },
              });
            } else {
              //if not found in database or login 1st time
              let newPass = email + process.env.JWTPRIVATEKEY;
              bcrypt.hash(newPass, 10, function (err, hashed_pw) {
                let newUser = new User({
                  name: name,
                  email_verified: email_verified,
                  email: email,
                  password: hashed_pw,
                  image: picture,
                });
                newUser.save((err, data) => {
                  if (err) {
                    return res.status(400).json({
                      message: "Something went wrong",
                    });
                  }
                  const token = jwt.sign(
                    {
                      _id: data._id,
                      name: data.name,
                      email: data.email,
                      image: data.image,
                      role: data.role,
                      email_verified: data.email_verified,
                    },
                    process.env.JWTPRIVATEKEY,
                    {
                      expiresIn: "7d",
                    }
                  );
                  // const {_id, name, email} = newUser;
                  // console.log(_id, name, email)
                  res.status(200).send({
                    message: "login success",
                    success: true,
                    token: token,
                  });
                });
              });
            }
          }
        });
      }
    });
};

// login with facebook
exports.facebookLogin = (req, res) => {
  let { accessToken, userID } = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  fetch(urlGraphFacebook, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      const { email, name } = response;
      //if user exist or not
      User.findOne({ email }).exec((err, user) => {
        if (err) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        } else {
          if (user) {
            const token = jwt.sign(
              {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                role: user.role,
                email_verified: user.email_verified,
              },
              process.env.JWTPRIVATEKEY,
              {
                expiresIn: "7d",
              }
            );
            res.status(200).send({
              message: "login success",
              data: {
                success: true,
                token: token,
              },
            });
          } else {
            //if not found in database or login 1st time
            let newPass = email + process.env.JWTPRIVATEKEY;
            bcrypt.hash(newPass, 10, function (err, hashed_pw) {
              let newUser = new User({
                name: name,
                email: email,
                password: hashed_pw,
              });
              newUser.save((err, data) => {
                if (err) {
                  return res.status(400).json({
                    message: "Something went wrong....",
                  });
                }
                const token = jwt.sign(
                  {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    image: data.image,
                    role: data.role,
                    email_verified: data.email_verified,
                   

                  },
                  process.env.JWTPRIVATEKEY,
                  {
                    expiresIn: "7d",
                  }
                );
                // const {_id, name, email} = newUser;
                // console.log(_id, name, email)
                res.status(200).send({
                  message: "login success",
                  success: true,
                  token: token,
                });
              });
            });
          }
        }
      });
    });
};
