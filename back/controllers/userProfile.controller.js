const userModel = require("../models/User");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

module.exports.getStats = async (req, res) => {
  const { user } = req.body;
  const profile = await sequelize.query(
    "SELECT * FROM users u JOIN stats_users su ON u.id_user = su.id_user where id IN :user ",

    {
      raw: true,
      replacements: { user: user },
      type: QueryTypes.SELECT,
    }
  );
};
