// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GitHubStrategy = require("passport-github2").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const jwt = require("jsonwebtoken")
// const passport = require("passport");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       //   return cb(err, user);
//       // });]

//       //   for mongo using
//       // const user  = {
//       //     username: profile.displayName,
//       //     avatar: profile.photos[0]
//       // }
//       // create new user
//       // new User({
//       //     user: user
//       // }).save()

//       console.log(accessToken); //rig
//       console.log(refreshToken); //undi
//       console.log(profile); //rig


//       done(null, profile);
//     }
//   )
// );

// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       // check if in your model if profile.id is exist or not
//       // else insert all profile data in your model
//       done(null, profile);
//     }
//   )
// );
// // for serializing and deserializing session
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });
