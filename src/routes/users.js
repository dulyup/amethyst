const express = require('express');
const passport = require('passport');
const User = require('../model/user');
const app = express();

//middleware
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin','http://localhost:3000');
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
            res.status(200).send(doc);
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({error: e})
        })
});

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

app.post('/', (req, res) => {
    const user = new User({
        username: req.body.username,
        avatar: req.body.avatar,
        email: req.body.email,
        //don't send password to db
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

app.delete('/:userId', (req, res) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result => res.status(200).send(result))
        .catch(e => {
            console.log(e);
            res.status(500).send({error: e})
        });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    // req.user 中会包含在 deserializeUser 函数中传入的 user 数据
    // console.log(req.user);
    const returnData = {
        isSuccess: true,
        username: req.user.username,
        avatarImg: req.user.avatarImg,
    };
    const name = 'a'

    req.session.xx = {}; //自动有session，cookie，因为有credentials，session每次自动存在
    req.flash("success", "LOGGED YOU IN!");
    res.status(200).send(JSON.stringify(returnData));
    //TODO: jump to homepage
});

app.get('/logout', (req, res) => {
    req.logout();
    console.log('logout successfully!');
    req.flash("success", "LOGGED YOU OUT!");
    res.send('logout successfully!');
    //TODO: jump to login page
});

//test
app.get('/session', (req, res) => {
    console.log(req.session);
    const sess = req.session;
    console.log(`session id is: ${sess.id}`);
    res.send(sess);
});

// 调用我们之前在 passport-config 中封装的用于验证用户是否已经被验证的中间件函数
// 即可限制未被验证的用户不能请求该路由，返回 Error: 401(Unauthorized)
// app.get('/testAuth', passport.authenticateMiddleware(), function(req, res) {
//
//     // ......
//
// });


module.exports = app;

