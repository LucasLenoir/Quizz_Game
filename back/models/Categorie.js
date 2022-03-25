const { Sequelize } = require("sequelize");

const { DataTypes } = require("sequelize");

const Categorie = sequelize.define(
  "categories",
  {
    //Model attributes are defined here
    id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "categories",
  }
);
module.exports = { Categorie };
