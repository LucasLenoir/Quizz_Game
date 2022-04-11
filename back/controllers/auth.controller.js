const UserModel = require("../models/User");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });

//!check user in DB And create One
module.exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await sequelize.query(
    "SELECT * FROM users where username = :username or email = :email",
    {
      raw: true,
      replacements: { username: username, email: email },
      type: QueryTypes.SELECT,
    }
  );

  if (user.length > 0) {
    console.log("user already exists");
    console.log("email already exists");
    res.status(400).send("ERROR, user or email already exists");
  } else {
    UserModel.create({ username, email, password });
    res.status(201).send("USER PROFILE CREATED");
  }
};

//!check user in DB And logs One
module.exports.signIn = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await userModel.findOne({ where: { username } });
  const { id_user } = user.dataValues;

  if (user) {
    //! compare the password from the front to the hashed one in the DB
    if (bcrypt.compareSync(password, user.password)) {
      let token = jwt.sign({ id_user }, process.env.TOKEN_SECRET);

      //! create the token and store it in cookies (httpOnly means only our server can acces it)

      res.status(200).send({ id_user, token });

      console.log("User found and logged");
    } else {
      res.status(401).send("error, password didn't match");
    }
  } else {
    res.status(400).send(Error);
    console.log("user not found");
  }
};

module.exports.logout = async (req, res) => {
  token = `jwt=""`;

  res.status(200).json("USER LOGGED OUT", token);
};
