const userModel = require("../models/User");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");
const questionModel = require("../models/Question");
const responsesModel = require("../models/response");
const quizzModel = require("../models/Quizz");
const statsModel = require("../models/StatUsers");



//Get all user's info to display
module.exports.getUserInfo = async (req, res) => {
  const data = req.body;

  const infos = await userModel.findAll({ where: { id_user: id_user } });
  if (quizz) {
    res.status(200).send(infos);
  } else {
    res.status(401).send("ERROR COULDN'T FIND ANY INFO");
  }
};
module.exports.updateUserInfo = async (req, res) => {
  const datas = req.body;
  const id_user = datas[0].id_user;
  const username = datas[0].username;
  const password = datas[0].password;
  const picture = datas[0].picture;
  const bio = datas[0].bio;

  const udpatded = userModel.update({
    username: username,
    password: password,
    picture: picture,
    bio: bio,
  });
  if (udpatded) {
    res.status(200).send("profile updated");
  } else {
    res.status(401).send("ERROR COULDN'T UPDATE INFO");
  }
};

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
  res.send(200).send(profile);
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

module.exports.updateQuizz = async (req, res) => {
  const datas = req.body;
  for (i in datas) {
    const id_quizz = datas[i].id_quizz;
    const name = datas[i].name;
    const id_question = datas[i].id_question;
    const id_category = datas[i].id_category;
    const question = datas[i].question;
    const response_1 = datas[i].response_1;
    const response_2 = datas[i].response_2;
    const response_3 = datas[i].response_3;
    const response_4 = datas[i].response_4;

    const updatedQuizzInfo = await quizzModel.update(
      { id_category: id_category, name: name },
      { where: id_quizz }
    );
  }
  if (updatedQuizzInfo) {
    res.status(201).send("Quizz Info updated");
  } else {
    res.status(400).send("ERROR COULDN'T UPDATE QUIZZ INFO");
  }

  const updatedquizzQuestion = await questionModel.update(
    { id_category: id_category, name: name },
    { where: id_question }
  );

  if (updatedquizzQuestion) {
    res.status(201).send("Quizz Question updated");
  } else {
    res.status(400).send("ERROR COULDN'T UPDATE QUIZZ QUESTION");
  }

  const updateResponseQuizz = await responsesModel.update({
    response_1: response_1,
    response_2: response_2,
    response_3: response_3,
    response_4: response_4,
  });
  if (updatedquizzQuestion) {
    res.status(201).send("Quizz Responses updated");
  } else {
    res.status(400).send("ERROR COULDN'T UPDATE QUIZZ RESPONSES");
  }
};

module.exports.updateStats = async (req, res) => {
  const data = req.body;

  const updateStatsRes = await statsModel.create({
    id_user: id_user,
    id_category: id_category,
    score: score,
    number_question: number_question,
  });
  if (updateStatsRes) {
    res.status(201).send("score updated");
  } else {
    res.status(401).send("EROOR SCORE NOT UPDATED");
  }
};
