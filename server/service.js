const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parse');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb://localhost:27017/sharing");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser('secret'));

// app.get('/users', (req, res) => {
//     mongoose.model('user').find((err, users) => {
//         res.send(JSON.stringify(users));
//     })
// });
//
// app.get('/users/:userId', (req, res) => {
//     const id = req.params.id;
//     if (User.findById())
// });

app.get('/posts', (req, res) => {
    mongoose.model('post').find((err, posts) => {
        res.send(JSON.stringify(posts));
    })
});

app.get('/posts/:userId', (req, res) => {
    mongoose.model('post').find({user: req.params.userId}, (err, post) => {
        res.send(JSON.stringify(post));
    })
});

