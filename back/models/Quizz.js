const { Sequelize, string } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory");

const Quizz = sequelize.define(
  "quizz",
  {
    //Model attributes are defined here
    id_quizz: {
        type: DataTypes.INTEGER, primaryKey: true,

    },
    id_question: {
        type: DataType.INTEGER, 
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    id_quiz: {
        type: DataTypes.INTEGER, 
    }
  },
  {
    tableName: "quizz",
  }
);

module.exports = {Quizz};
