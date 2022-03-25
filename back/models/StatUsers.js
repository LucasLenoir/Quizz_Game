const sequelize = require("../config/dbConfig");
const { DataTypes } = require("sequelize");
const userModel = require("./User");

const userStatModel = sequelize.define("stats_users", {
  id_stat: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
  },
  id_category: {
    type: DataTypes.INTEGER,
  },
  score: {
    type: DataTypes.INTEGER,
  },
  id_quizz: {
    type: DataTypes.INTEGER,
  },
});

userStatModel.belongsTo(userModel, {
  foreignKey: "id_user",
  targetKey: "id_user",
});
module.exports = userStatModel;
