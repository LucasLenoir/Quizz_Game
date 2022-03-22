const userModel = require("../models/User");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

module.exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  const insertUser = await sequelize.query(
    "INSERT INTO users (username, email, password) VALUES(:data)",
    {
      raw: true,
      replacements: { data: [username, email, password] },
      type: QueryTypes.INSERT,
    }
  );

  res.send(insertUser);
};

// module.exports.login = async (req, res) =>{

// }