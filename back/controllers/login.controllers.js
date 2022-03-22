const { User} = require("../models/user");
const { Op } = require("sequelize");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

module.exports.checkAndLoggin = async (req, res) => {
  const { username, password } = req.body;

  const resLoggin = await sequelize.query(
    "SELECT * FROM users WHERE username = :data",
    {
      raw: true,
      replacements: { data: { username } },
      type: QueryTypes.SELECT,
    }
  );

  res.send(resLoggin);
};
