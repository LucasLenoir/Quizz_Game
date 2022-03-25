const sequelize = require("../config/dbConfig");
const { DataTypes } = require("sequelize");

const Responses = sequelize.define(
  "responses",
  {
    //Model attributes are defined here
    id_response: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_question: {
      type: DataTypes.INTEGER,
    },
    response_1: {
      type: DataTypes.STRING,
    },
    response_2: {
      type: DataTypes.STRING,
    },
    response_3: {
      type: DataTypes.STRING,
    },
    response_4: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "responses",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Responses;
