const express = require('express');
const passport = require('passport');
const User = require('../model/user');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

app.get('/', (req, res) => {
    User.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
});

app.get('/:userId', (req, res) => {
    User.findById(req.params.userId)
        .exec()
        .then(doc => {
            if (doc) {
                console.log("From database", doc);
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

    app.post('/', (req, res) => {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        user.save().then(result => {
            console.log(result);
        }).catch(e => console.log(e));
    });

    app.delete('/:userId', (req, res) => {
        User.remove({_id: req.params.userId})
            .exec()
            .then(result => res.status(200).json(result))
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            });
    });
});
module.exports = app;

// router.get('/register', function (req, res, next) {
//     res.render('register', {title: 'Register'})
// });
//
//
// router.post('/register', function (req, res) {
//     const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//     });
//     User.register(newUser, req.body.password, function (err, user) {
//         if (err) {
//             console.log(err);
//             return res.render("register", {info: "Sorry. That username already exists. Try again."})
//         }
//         passport.authenticate('local')(req, res, () => {
//             //TODO: jump to main page
//         });
//     });
// });
//
// router.get('/login', function (req, res) {
//     res.render('login', {title: 'Login', user: req.user})
// });
//
// router.post('/login', passport.authenticate('local'), function (req, res) {
//     res.redirect('/dashboard');
// });
//
// router.get('/logout', function (req, res) {
//     req.logout();
//     res.redirect('/');
// });
//
// router.get('/ping', function (req, res) {
//     res.status(200).send("pong!");
// });

