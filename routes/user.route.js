const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.get('/:googleId/articles', userController.saveArticle)

module.exports = router