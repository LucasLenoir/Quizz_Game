const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
require("dotenv").config({ path: "./config/.env" });

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await userModel.findOne({
          where: { id_user: decodedToken.id_user },
        });
        console.log("hello");
        res.locals.user = user.id_user;
        console.log(user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.id_user);
        res.locals.user = decodedToken.id_user;
        next();
      }
    });
  } else {
    console.log("NO TOKEN");
    next();
  }
};
