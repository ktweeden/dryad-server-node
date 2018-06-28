const express = require('express')
const userRouter = new express.Router()
const User = require('../schemas/User.js')

userRouter.get('/', function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.error(err);
      res.status(500);
      res.send();
      return;
    };
    res.json(users)
  })
})

userRouter.get('/:uid', function (req, res) {
  User.findOne({ UID: req.params.uid }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500);
      res.send();
      return;
    };
    res.json(user)
  })
})


userRouter.post('/', function (req, res) {
  const newUser = new User(req.body)
  console.error('request', req.body);
  
  newUser.save(function (err, user) {
    if (err) {
      console.error(err)
      res.status(500)
      res.send()
      return
    }
    res.status(201)
    res.json(user)
  })
})

userRouter.delete('/', function (req, res) {
  User.deleteMany(function (err) {
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



module.exports = userRouter