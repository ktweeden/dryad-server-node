const express = require('express')
const storyRouter = new express.Router()
const Story = require('../schemas/Story.js')
const StorySection = require('../schemas/StorySection.js')

storyRouter.get('/', function(req, res) {
  Story.find(function(err, stories) {
    if (err) {
      console.error(err);
      res.status(500);
      res.send();
      return;
    };
    res.json(stories)
  })
})

storyRouter.get('/:id', function(req, res) {
  Story.findById(req.params.id).
    populate('startingSection').
    exec(function(err, story) {
    if (err) {
      console.error(err);
      res.status(500);
      res.send();
      return;
    }
    res.json(story)
  })
})

storyRouter.put('/:id', function(req, res) {
  Story.findByIdAndUpdate(req.params.id, req.body, function(err, story) {
    if (err) {
      console.error(err);
      res.status(500);
      res.send();
      return;
    }
    res.json(story)
  })
})

storyRouter.get('/:id/sections', function(req, res) {
  StorySection.find({story: req.params.id}).
    populate('user', 'userName').
  exec(function(err, stories) {
    if (err) {
      console.error(err);
      res.status(500);
      res.send();
      return;
    }
    const storyTree = createStoryTree(stories)
    res.json(storyTree)
  })
})

storyRouter.post('/', function (req, res) {
  const newStory = new Story(req.body)
  newStory.save(function (err, story) {
    if (err) {
      console.error(err);
      res.status(500);
      res.send();
      return;
    };
    res.status(201);
    res.json(story);
  });
});

storyRouter.delete('/', function(req, res) {
  Story.deleteMany(function(err) {
    if (err) {
      console.error(err);
      res.status(500);
      res.send();
      return;
    };
    console.log('Everything has gone');
    res.status(204);
    res.send();
  })
})

const createStoryTree = function(sectionArray) {
  const storyTree = {}
  
  console.dir(sectionArray[0])
  sectionArray.forEach(section => {
    if (!storyTree[section._id]) {
      storyTree[section._id] = []
    }
    if (!storyTree[section.previousSection]) {
      storyTree[section.previousSection] = [section]
    }
    else {
      storyTree[section.previousSection].push(section)
    }
  })

  return storyTree
}


module.exports = storyRouter