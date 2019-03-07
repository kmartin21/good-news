const express = require('express')
const router = express.Router()

const storiesController = require('../controllers/stories.controller')

router.get('/', storiesController.getTopStories)

module.exports = router