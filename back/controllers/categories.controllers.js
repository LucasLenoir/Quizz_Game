const { Question } = require("../models/Question");
const { Op } = require("sequelize");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

//!Get Questions by Categories
module.exports.getCategories = async (req, res) => {
  const { categories } = req.body;

  const resQuestions = await sequelize.query(
<<<<<<< HEAD
    "SELECT id_category, question,  response_1, response_2, response_3, response_4  FROM questions  q JOIN responses  r ON q.id_question = r.id_question WHERE q.id_category IN(:categories)",
=======
    "SELECT id_category,	question, response_1, response_2, response_3, response_4  FROM questions  q JOIN responses  r ON q.id_question = r.id_question WHERE q.id_category IN(:categories)",
>>>>>>> d249183fb7a0e31e0ea1633b2cf8534a0d0c519d
    {
      raw: true,
      replacements: { categories },
      type: QueryTypes.SELECT,
    }
  );

  res.send(resQuestions);
};
