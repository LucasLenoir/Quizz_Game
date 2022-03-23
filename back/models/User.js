const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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
      lowercase: true,
      validate: [isEmail],
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      max: 1024,
      minLength: 6,
    },
    bio: {
      type: DataTypes.STRING,
      max: 1024,
    },
    picture: {
      type: DataTypes.STRING,
      default: "./front/asset??????",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "users",
  }
);

//play function before saving in DB
// userModel.prototype.crypt = () => {
//   const salt = bcrypt.genSaltSync();
//   this.password = bcrypt.hashSync(this.password, salt);

//   console.log(this.password);
// };

module.exports = userModel;
