require('./config/config');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');
const fs = require('fs');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate')

var port = process.env.PORT;
var app = express();


app.use(bodyParser.json());

// get/todos
app.get('/users', async (req, res) => {
  try {
    const result = JSON.parse(fs.readFileSync('/Users/abhilashgaddam/Documents/Node.js-Users-api/server/users.json', 'utf8'));
    res.send({ result });
  }
  catch (e) {
    res.status(400).send(e);
  }
})

app.get('/checkuserexists', async (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync('/Users/abhilashgaddam/Documents/Node.js-Users-api/server/users.json', 'utf8'));
    const newUser = { username: req.body.username };
    const isUserAlreadyExists = users.find(user => user.username == newUser.username) !== undefined;
    res.send({message: isUserAlreadyExists ? 'user already exists' : 'user doesn\'t exists'});    
  }
  catch (e) {
    res.status(500).send(e);
  }
})

app.post('/user', async (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync('/Users/abhilashgaddam/Documents/Node.js-Users-api/server/users.json', 'utf8'));
    const newUser = { username: req.body.username, name: req.body.name, age: req.body.age, password: req.body.password, isAdmin: req.body.isAdmin };
    const isUserAlreadyExists = users.find(user => user.username == newUser.username) !== undefined;
    users.push(newUser);
    fs.writeFileSync('/Users/abhilashgaddam/Documents/Node.js-Users-api/server/users.json', JSON.stringify(users));
    res.send({ message: 'success' });
  }
  catch (e) {
    res.status(400).send(e);
  }
})

app.get('/user/:username', async (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync('/Users/abhilashgaddam/Documents/Node.js-Users-api/server/users.json', 'utf8'));
    const user = users.find((user) => user.username === req.params.username);
    res.send({ user });
  }
  catch (e) {
    res.status(400).send(e);
  }
})



app.listen(3000, () => {
  console.log(`Server is up on port: ${port}`);
})

module.exports = { app };
