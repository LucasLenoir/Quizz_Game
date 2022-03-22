const { User } = require("../models/Question");
const { Op } = require("sequelize");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

module.exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  console.log(username);
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
