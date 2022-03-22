const router = require('express').Router()
const CategoriesControllers = require('../controllers/categories')

router.post('/', CategoriesControllers.getCategories)
module.exports = router;