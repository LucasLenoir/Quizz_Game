const userModel = require("../models/User");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");
const questionModel = require("../models/Question");
const responsesModel = require("../models/response");
const quizzModel = require("../models/Quizz");

module.exports.getStats = async (req, res) => {
  const { user } = req.body;
  const profile = await sequelize.query(
    "SELECT * FROM users u JOIN stats_users su ON u.id_user = su.id_user where id IN :user ",

    {
      raw: true,
      replacements: { user: user },
      type: QueryTypes.SELECT,
    }
  );
};

module.exports.create = async (req, res) => {
  const datas = req.body;

  for (i in datas) {
    question = datas[i].question;
    id_category = datas[i].category;
    id_quizz = datas[i].id_quizz;

    await questionModel.create({
      id_category: id_category,
      question: question,
      id_quizz: id_quizz,
    });

    const { id_question } = await questionModel.findOne({
      attributes: ["id_question"],
      where: { question: question },
    });

    responsesModel.create({
      id_question,
      response_1: datas[i].response_1,
      response_2: datas[i].response_2,
      response_3: datas[i].response_3,
      response_4: datas[i].response_4,
    });
  }
  res.status(201).send("Question validated");
};

module.exports.getAllQuizz = async (req, res) => {
  const id_user = req.body;

  const quizz = await quizzModel.findAll({ where: { id_user: id_user } });

  if (quizz) {
    res.status(200).send(quizz);
  } else {
    res.status(401).send("ERROR COULDN'T FIND ANY QUIZZ");
  }
};

module.exports.getQuestionsByQuizz = async (req, res) => {
  const id_quizz = req.body;

  const quizz = await questionModel.findAll({ where: { id_quizz: id_quizz } });
  if (quizz) {
    res.status(201).send(quizz);
    console.log("questions found");
  } else {
    res.status(400).send("ERROR COULDN'T LOAD THE QUIZZ");
  }
};
