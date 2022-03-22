const userModel = require("../models/User");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

module.exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  const checkUser = await sequelize.query(
    "SELECT * FROM users where username = :username or email = :email",
    {
      raw: true,
      replacements: { username: username, email: email },
      type: QueryTypes.SELECT,
    }
  );

  if (checkUser) {
    console.log("user already exists");
    console.log("email already exists");
    res.status(400).send("ERROR, user or email already exists");
  } else {
    const insertUser = await sequelize.query(
      "INSERT INTO users (username, email, password) VALUES(:data)",
      {
        raw: true,
        replacements: { data: [username, email, password] },
        type: QueryTypes.INSERT,
      }
    );

    res.status(201).send(insertUser);
  }
};

// module.exports.login = async (req, res) =>{

// }
