const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
require("dotenv").config({ path: "./config/.env" });
let token;

module.exports.checkUser = (req, res, next) => {
  console.log("yo");
  console.log(req.originalUrl);
  if (req.originalUrl.startsWith("/api/user/profile/user")) {
    token = req.body.token;
    if (token) {
      console.log(token);
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          throw err;
        } else {
          let user = await userModel.findOne({
            where: { id_user: decodedToken.id_user },
          });
          console.log("hello");

          console.log(user);
          res.status(200).send(user);
        }
      });
    } else {
      console.log("hello2");
      res.status(400).send("Authentification failed");
    }
  } else {
    next();
  }
};
