const { Sequilize, string } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory");

const response = sequilize.define(
  "responses",
  {
    //Model attributes are defined here
    id_responses: {
      type: DataTypes.INTEGER,
      primarykey: true,
    },
    id_question: {
      type: DataTypes.INTEGER,
    },
    response_True: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    response_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    response_3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    response_4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "responses",
    timestamps: false,
  },
  { freezeTableName: true }
);

module.exports = { response };
