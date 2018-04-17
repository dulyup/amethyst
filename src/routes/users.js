const express = require('express');
const passport = require('passport');
const User = require('../model/user');
const app = express();

//middleware
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,POST,GET,PUT,DELETE');
    next();
});

//后端的URI，与前端URI匹配
app.get('/', (req, res) => {
    User.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(e => {
            console.log(e);
            res.status(500).json({error: e})
        })
});

app.get('/:userId', (req, res) => {
    User.findById(req.params.userId)
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc);
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).json({error: e});
        });
});

app.get('/:username', (req, res) => {
    User.where('username').equals(req.params.username)
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc);
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found for provided username'});
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).json({error: e});
        })
});

app.get('/:email', (req, res) => {
    User.where('email').equals(req.params.email)
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc);
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found for provided email'});
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).json({error: e});
        })
});

app.post('/', (req, res) => {
    const user = new User({
        username: req.body.username,
        avatar: req.body.avatar,
        email: req.body.email,
        password: req.body.password
    });
    User.register(user, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            console.log(`Successfully Signed Up! Nice to meet you ${req.body.username}`);
            //jump to main page
        })
    })
    // user.save()
    //     .then(result => {console.log(result);})
    //     .catch(e => console.log(e));
    // //TODO: check the result of save, and send status of res
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    // req.user 中会包含在 deserializeUser 函数中传入的 user 数据
    console.log("-------req.user-----------");
    console.log(req.user);
    console.log("-------req.user-----------");
    const returnData = {
        isSuccess: true,
        username: req.user.username
    };
    res.send(JSON.stringify(returnData));
});

//test
app.get('/session', (req, res) => {
    console.log(req.session);
    const sess = req.session;
    console.log(`session id is: ${sess.id}`);
    res.json(sess);
});

// 调用我们之前在 passport-config 中封装的用于验证用户是否已经被验证的中间件函数
// 即可限制未被验证的用户不能请求该路由，返回 Error: 401(Unauthorized)
// app.get('/testAuth', passport.authenticateMiddleware(), function(req, res) {
//
//     // ......
//
// });

app.delete('/:userId', (req, res) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result => res.status(200).json(result))
        .catch(e => {
            console.log(e);
            res.status(500).json({error: e})
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

