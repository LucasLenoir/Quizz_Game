const { Question } = require("../models/Question");
const { Op } = require("sequelize");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");


//!Get Questions by Categories
module.exports.getCategories = async (req, res) => {
  const { categories } = req.body;
<<<<<<< HEAD


  const resQuestions = await sequelize.query(
    "SELECT question, response_1, response_2, response_3, response_4  FROM questions  q JOIN responses  r ON q.id_question = r.id_question WHERE q.id_category IN(:categories)",
=======

  const resQuestions = await sequelize.query(
    "SELECT question,  response_1, response_2, response_3, response_4  FROM questions  q JOIN responses  r ON q.id_question = r.id_question WHERE q.id_category IN(:categories)",
>>>>>>> 6234586e8aeb8fd0d885d9ec178c60218b6e0957
    {
      raw: true,
      replacements: { categories },
      type: QueryTypes.SELECT,
    }
  );
  res.send(resQuestions);
};
