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
    // bio: {
    //   type: DataTypes.STRING,
    //   max: 1024,
    // },
    // picture: {
    //   type: DataTypes.STRING,
    // },
  },
  {
    hooks: {
      beforeCreate: (users) => {
        console.log("salut");
        const salt = bcrypt.genSaltSync();
        users.password = bcrypt.hashSync(users.password, salt);
      },
    },

    timestamps: false,
    freezeTableName: true,
    tableName: "users",
  }
);

// userModel.beforeCreate(async () => {
//   console.log(hash);
//   user.password = hash;
//   // }).catch(err =>{
//   //   throw new Error();
// });

//play function before saving in DB
// userModel.prototype.crypt = () => {
//   const salt = bcrypt.genSaltSync();
//   this.password = bcrypt.hashSync(this.password, salt);

//   console.log(this.password);
// };

module.exports = userModel;
