const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.post('/:googleId/articles', userController.saveArticle)
router.get('/:googleId/articles', userController.getAllArticles)
router.delete('/:googleId/articles/:articleId', userController.deleteArticle)

module.exports = router