const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
require("dotenv").config({ path: "./config/.env" });
let token;

module.exports.checkUser = (req, res, next) => {
  if (req.originalUrl.startsWith("/api/user/profile/user")) {
    token = req.body.token;
    if (token === undefined || !token || token === null) {
      token = req.body[0].token;
    }
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {   
          console.log("Token authentification Failed");
          throw err
       
        } else {
          next();
        }
      });
    } else {
      res.status(400).send("Authentification failed");
    }
  } else {
    next();
  }
};
