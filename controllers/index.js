const express = require('express')
const router = new express.Router()
const storyRouter= require('./StoryController.js')
const storySectionRouter = require('./StorySectionController.js')
const userRouter = require('./UserController.js')


router.use('/story', storyRouter)
router.use('/story_section', storySectionRouter)
router.use('/user', userRouter)


module.exports = router