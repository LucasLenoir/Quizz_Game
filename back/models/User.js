const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userModel = sequelize.define(
  "user",
  {
    //Model attributes are defined here
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      // lowercase: true,
      // validate: [isEmail],
    },
    password: {
      type: DataTypes.STRING,
      max: 1024,
      minLength: 6,
    },
    bio: {
      type: DataTypes.STRING,
      max: 1024,
    },
    picture: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: (users) => {
        console.log('helloCreate');
        const salt = bcrypt.genSaltSync();
        users.password = bcrypt.hashSync(users.password, salt);
      },
      beforeUpdate: (users) => {
        const salt = bcrypt.genSaltSync();
        users.password = bcrypt.hashSync(users.password, salt);
        console.log(users.password);
        console.log('hello');
      },
    },

    timestamps: false,
    freezeTableName: true,
    tableName: "users",
  }
);

module.exports = userModel;
