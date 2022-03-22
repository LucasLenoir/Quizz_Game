const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory");

const userModel = sequelize.define(
  "user",
  {
    //Model attributes are defined here
    id_user: {
      type: DataTypes.INTEGER,
      // autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
     freezeTableName: true,
    tableName: "users",
  }
);

module.exports = userModel;
