const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.post('/:googleId/articles', userController.saveArticle)
router.get('/:googleId/articles', userController.getAllArticles)
router.put('/:googleId/articles', userController.deleteArticle)
router.get('/:googleId/profile', userController.getUser)

module.exports = router