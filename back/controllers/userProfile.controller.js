const userModel = require("../models/User");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");
const questionModel = require("../models/Question");
const responsesModel = require("../models/response");
const quizzModel = require("../models/Quizz");
const statsModel = require("../models/StatUsers");
const checkUser = require("../middleware/auth.middleware");

//!Get all user's info to display
module.exports.getUserInfo = async (req, res) => {
  let token = req.body.token;
  let id_user = req.body.id_user;
  console.log(token);

  const infos = await userModel.findAll({
    attributes: { exclude: ["password"] },
    where: { id_user: id_user },
  });
  if (infos) {
    res.status(200).send(infos);
  } else {
    res.status(401).send("ERROR COULDN'T FIND ANY INFO");
  }
};
//!update User Info
module.exports.updateUserInfo = async (req, res) => {
  const datas = req.body;
  console.log(datas);
  let id_user = datas[0].id_user;
  let username = datas[0].username;
  let password = datas[0].password;
  let picture = datas[0].picture;
  let bio = datas[0].bio;
  console.log(id_user);

  const udpatded = userModel.update(
    {
      username: username,
      password: password,
      picture: picture,
      bio: bio,
    },
    { where: { id_user } }
  );
  if (udpatded) {
    res.status(200).send("profile updated");
  } else {
    res.status(401).send("ERROR COULDN'T UPDATE INFO");
  }
};
//!Get user's stats
module.exports.getStats = async (req, res) => {
  let token = req.body[0].token;
  let id_user = req.body[0].id_user;
  console.log(id_user);

  const profile = await statsModel.findAll({
    attributes: [
      "id_user",
      "id_category",
      "score",
      "number_question",
      "id_quizz",
    ],
    where: { id_user: id_user },
  });
  console.log(profile);
  if (profile) {
    res.status(200).send(profile);
  } else {
    res.status(401).send("stats not found");
  }
};

//!Update Users after a game
module.exports.updateStats = async (req, res) => {
  let datas = req.body;
  for (i in datas) {
    let id_user = datas[i].id_user;
    let id_category = datas[i].id_category;
    let score = datas[i].score;
    letnumber_question = datas[i].number_question;

    const updateStatsRes = await statsModel.create({
      id_user: id_user,
      id_category: id_category,
      score: score,
      number_question: number_question,
    });
  }
  res.status(201).send("score updated");
};

//!Create a Quizz
module.exports.createQuizz = async (req, res) => {
  let datas = req.body;

  let id_category = datas[0].id_category;
  let id_user = datas[0].id_user;
  let name = datas[0].name;
  console.log(id_category);
  const reqQuizz = await quizzModel.create({
    id_category: id_category,
    name: name,
    id_user: id_user,
  });
  console.log(reqQuizz);
  const { id_quizz } = await quizzModel.findOne({
    attributes: ["id_quizz"],
    where: { name: name },
  });

  for (i in datas) {
    question = datas[i].question;
    let id_category = datas[i].id_category;
    let id_user = datas[i].id_user;
    await questionModel.create({
      id_category,
      question: question,
      id_quizz,
      id_user: id_user,
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
//!Fetch all user's quizz already created
module.exports.getAllQuizz = async (req, res) => {
  const id_user = req.body;

  const quizz = await quizzModel.findAll({ where: { id_user: id_user } });

  if (quizz) {
    res.status(200).send(quizz);
  } else {
    res.status(401).send("ERROR COULDN'T FIND ANY QUIZZ");
  }
};
//!fetch all the question related to one quizz
module.exports.getQuestionsByQuizz = async (req, res) => {
  let id_quizz = req.body;

  const quizz = await questionModel.findAll({ where: { id_quizz: id_quizz } });
  if (quizz) {
    res.status(201).send(quizz);
    console.log("questions found");
  } else {
    res.status(400).send("ERROR COULDN'T LOAD THE QUIZZ");
  }
};

module.exports.getQuizzById = async (req, res) => {
  const id_quizz = req.body;

  const resQuestions = await sequelize.query(
    "SELECT id_category,	question, response_1, response_2, response_3, response_4  FROM questions  q JOIN responses  r ON q.id_question = r.id_question WHERE q.id_quizz =(:id_quizz)",
    {
      raw: true,
      replacements: id_quizz,
      type: QueryTypes.SELECT,
    }
  );

  res.send(resQuestions);
};
// module.exports.getQuizzByID = async (req, res) => {
//   let id_quizz = req.body.id_quizz;

//   try {
//     let quizzQ = await questionModel.findAll({
//       where: { id_quizz: id_quizz },
//     });

//     for (i in quizzQ) {
//       id_question = quizzQ[i].id_question;
//       quizzQ[i].response = await responsesModel.findAll({
//         where: { id_question },
//       });
//       if (i == quizzQ.length - 1) {
//         res.status(201).send({ quizzQ });
//       }
//       console.log(quizzQ[i].id_response);
//     }
//   } catch (error) {
//     throw error;
//   }
// };
//!update Quizz Info, Quizz Q and Quizz R
module.exports.updateQuizz = async (req, res) => {
  let datas = req.body;
  console.log(datas);
  for (i in datas) {
    let id_quizz = datas[i].id_quizz;
    let id_user = datas[i].id_user;
    let name = datas[i].name;
    let id_question = datas[i].id_question;
    let id_category = datas[i].id_category;
    let question = datas[i].question;
    let response_1 = datas[i].response_1;
    let response_2 = datas[i].response_2;
    let response_3 = datas[i].response_3;
    let response_4 = datas[i].response_4;

    try {
      const updatedQuizzInfo = await quizzModel.update(
        {
          id_category: id_category,
          name: name,
          id_user: id_user,
        },
        { where: { id_quizz: id_quizz } }
      );

      const updatedQuestionInfo = await questionModel.update(
        {
          question: question,
        },
        { where: { id_question: id_question } }
      );

      const updatedResponseInfo = await responsesModel.update(
        {
          response_1,
          response_2,
          response_3,
          response_4,
        },
        { where: { id_question: id_question } }
      );
    } catch (error) {
      res.status(404).send(error, "update failed");
    }
  }
  res.status(201).send("quizz updated");
};
