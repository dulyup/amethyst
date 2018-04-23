const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);

const app = express();

//middleware
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin','https://amethysts.herokuapp.com');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,POST,GET,PUT,DELETE');
    next();
});

/**
 * Get all users
 */
app.get('/', (req, res) => {
    User.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).send(doc);
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({error: e})
        })
});

/**
 * Look up a user by id
 */
app.get('/:userId', (req, res) => {
    User.findById(req.params.userId)
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc);
                res.status(200).send(doc);
            } else {
                res.status(404).send({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({error: e});
        });
});

/**
 * Look up a user by username
 */
app.get('/:username', (req, res) => {
    User.where('username').equals(req.params.username)
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc);
                res.status(200).send(doc);
            } else {
                res.status(404).send({message: 'No valid entry found for provided username'});
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({error: e});
        })
});

/**
 * Look up a user by email
 */
app.get('/:email', (req, res) => {
    User.where('email').equals(req.params.email)
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc);
                res.status(200).send(doc);
            } else {
                res.status(404).send({message: 'No valid entry found for provided email'});
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({error: e});
        })
});

/**
 * register
 */
app.post('/', (req, res) => {
    const name = req.body.username;
    const mail = req.body.email;
    const password = req.body.password;
    if (!password) {res.status(202).send({code:202,message: 'Invalid password'});return}
    if (password.length < 8 || password.length > 16) {res.status(202).send({code:202,message: 'Invalid Password:length must between 8 and 16'});return}
    let lower = 0, upper = 0, number = 0;
    for (let i of password) {
        if (i >= 'a' && i <= 'z'){lower++}
        else if (i >= 'A' && i <= 'Z'){upper++}
        else if (i >= '1' && i <= '9'){number++}
    }
    console.log(lower);
    console.log(upper);
    console.log(number);
    if (lower === 0 || upper === 0 || number === 0) {res.status(202).send({code:202,message: 'Invalid Password:must contain lowercase, uppercase and number'});return}
    if (!name) {res.status(404).send({message: 'Invalid username'});return;}
    let count=0;
    for (let i of mail) {if (i === '@'){count++;}}
    if (count !== 1) {res.status(202).send({code:202,message: 'Invalid email address'});return;}
    const hash = bcrypt.hashSync(password, salt);
    const user = new User({
        username: name,
        avatar: req.body.avatar,
        email: mail,
        password: hash
    });
    user.save()
        .then((doc) => {
                res.status(200).send({
                    code: 200,
                    message: "Register Successfully!",
                    username: doc.username
                });
            /**
             * doc:
             * { createAt: 2018-04-22T21:54:26.476Z,
              _id: 5add04b74d83e1223a442f6e,
              username: 'Peter',
              avatar: 'https://images.harrods.com/product/harrods/peter-rabbit-printed-notebook_000000000005800701.jpg?dwn=520px:592px',
              email: 'peter@111.com',
              password: '$2a$12$0vnyW2BETfU2vN6e1Q7QVe0E4L7NZVWNXR2/iUW.b3MaQ9qQRMHNu',
              __v: 0 }
             */
            /**
             * Session {
                  cookie:
                   { path: '/',
                     _expires: 2018-05-06T21:55:02.651Z,
                     originalMaxAge: 1209600000,
                     httpOnly: true } }
             */
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({e});
        })

    // //TODO: check the result of save, and send status of res
});

/**
 * Login
 */
app.post('/login', (req, res) => {
    User.where('username').equals(req.body.username)
        .exec()
        .then(doc => {
            if (doc) {
                /**
                 * doc:
                 * [{ createAt: 2018-04-22T21:54:26.476Z,
                    _id: 5add04b74d83e1223a442f6e,
                    username: 'Peter',
                    avatar: 'https://images.harrods.com/product/harrods/peter-rabbit-printed-notebook_000000000005800701.jpg?dwn=520px:592px',
                    email: 'peter@111.com',
                    password: '$2a$12$0vnyW2BETfU2vN6e1Q7QVe0E4L7NZVWNXR2/iUW.b3MaQ9qQRMHNu',
                    __v: 0 }]
                 */
                if (bcrypt.compareSync(req.body.password, doc[0].password)) {
                    req.session.loginInfo = {
                        id: doc[0]._id,
                        username: doc[0].username,
                        avatar: doc[0].avatar,
                        email: doc[0].email
                    };
                    /**
                     * Session {
                          cookie:
                           { path: '/',
                             _expires: 2018-05-06T22:01:15.516Z,
                             originalMaxAge: 1209600000,
                             httpOnly: true } }
                     */
                    res.status(200).send(req.session.loginInfo);
                }
            } else {
                res.status(404).send({message: 'No valid entry found for provided username'});
            }
        })
        .catch(e => {
            res.status(500).send({error: e});
        });
});

/**
 * Logout
 */
app.post('/logout', (req, res) => {
    try {
        req.session.destroy();
        res.status(200).send({message: 'Logout successfully!'})
    } catch (e) {
        res.status(500).send({error: e});
        console.log(e);
    }

    console.log('logout successfully!');
});

app.delete('/:userId', (req, res) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result => res.status(200).send(result))
        .catch(e => {
            console.log(e);
            res.status(500).send({error: e})
        });
});

module.exports = app;

