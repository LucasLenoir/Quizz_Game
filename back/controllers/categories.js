const db = require("../config/dbconfig");
const questions = []
const categories = require('categories');


module.exports.getCategories = (req, res) => {

    db.all(
        "Select * FROM questions WHERE category IN (?) ", [categories.join()], (err, docs) => {
            if (err) throw err
            action(res)
            const questions = res.send(docs)
        })

};
module.exports = [questions]



