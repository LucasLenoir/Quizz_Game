const router = require('express').Router()
const CategoriesControllers = require('../controllers/categories.controllers')

router.post('/', CategoriesControllers.getCategories)
module.exports = router;