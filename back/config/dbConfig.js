const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./config/QuizGame.sqlite",
  logging: false,
});

try {
  sequelize.authenticate();
  console.log("connection to DB has been established.");
} catch (error) {
  console.log("unable to connect to  DB", error);
}
module.exports = sequelize;
