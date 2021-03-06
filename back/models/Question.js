const sequelize = require("../config/dbConfig");

const { DataTypes } = require("sequelize");

const questionModel = sequelize.define(
  "questions",

  {
    //Model attributes are defined here
    id_question: {
      type: DataTypes.STRING,
      primaryKey: true,
      
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_quizz: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "questions",
    timestamps: false,
    freezeTableName: true
  },
  
);
module.exports = questionModel;
