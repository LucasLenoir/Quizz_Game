const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
require("dotenv").config({ path: "./config/.env" });
let token;

module.exports.checkUser = (req, res, next) => {
  if (req.originalUrl.startsWith("/api/user/profile/user")) {
    token = req.body.token;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          throw err;
        } else {
          let user = await userModel.findOne({
            where: { id_user: decodedToken.id_user },
          });
          console.log("helloMiddlewareCheckUser");
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
