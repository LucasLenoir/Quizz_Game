const { Question } = require("../models/Question");
const { Op } = require("sequelize");
const sequelize = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

module.exports.getCategories = async (req, res) => {
  const { categories } = req.body;


  const resQuestions = await sequelize.query(
    "SELECT question, response_True as response_1, response_2, response_3, response_4  FROM questions  q JOIN responses  r ON q.id_question = r.id_question WHERE q.id_category IN(:categories)",
    {
      raw: true,
      replacements: { categories },
      type: QueryTypes.SELECT,
    }
  );
  res.send(resQuestions);
};
