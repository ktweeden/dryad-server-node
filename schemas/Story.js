const mongoose = require('mongoose')

const StorySchema = mongoose.Schema({
    title: String,
    startingSection: { type: mongoose.Schema.Types.ObjectId, ref: 'StorySection' }
})

const Story = mongoose.model('Story', StorySchema)

module.exports = Story
