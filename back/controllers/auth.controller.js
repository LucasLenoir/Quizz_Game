const UserModel = require("../models/User");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const userModel = require("../models/User");

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
module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ where: { username } });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.status(201).send(user);
      console.log("User found and logged");
      console.log(user);
    } else {
      res.status(401).send("error, password didn't match");
    }
  } else {
    res.status(400);
    console.log("user not found");
  }
};
