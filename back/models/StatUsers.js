const sequelize = require("../config/dbConfig");
const { DataTypes } = require("sequelize");
const userModel = require("./User");

const userStatModel = sequelize.define(
  "stat_users",
  {
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
    number_question: {
      type: DataTypes.INTEGER,
    },

    id_quizz: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "stat_users",
    timestamps: false,
    freezeTableName: true,
  }
);

userStatModel.belongsTo(userModel, {
  foreignKey: "id_user",
  targetKey: "id_user",
});
module.exports = userStatModel;
