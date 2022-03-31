const sequelize = require("../config/dbConfig");
const { DataTypes } = require("sequelize");

const Quizz = sequelize.define(
  "quizz",
  {
    //Model attributes are defined here
    id_quizz: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "quizz",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Quizz;
