const express = require('express')
const parser = require('body-parser')
const mongoose = require('mongoose')
const server = express()
const indexRouter = require('./controllers/Index.js')

server.use(parser.json())
server.use(express.static('client/public'))

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

function initialiseDbConnection(onDbInitialise) {
    mongoose.connect('mongodb://localhost:27017/dryad')
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', onDbInitialise)

    server.use(indexRouter)
}

server.get('/', function(req, res) {
    res.json({message: 'hello'})
})



initialiseDbConnection(() => {
    server.listen(3001, function () {
        console.log('Listening on port 3001');
    });
})