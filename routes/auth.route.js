const router = require('express').Router()
const passport = require('passport')
const userController = require('../controllers/user.controller')

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/google/callback', passport.authenticate('google'), userController.loginUser)
router.get('/logout', userController.logoutUser)

module.exports = router

