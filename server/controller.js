// import passport from "./passport";
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../src/model/user');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json({ extended: true, type: '*/*' }) );
app.use(express.static(path.resolve(__dirname, '../react-react-ui/build')));
app.use(cookieParser('secret'));
mongoose.connect("mongodb://localhost:27017/sharing");

//requiring routes
const userRoutes = require('../src/routes/users');
const postRoutes = require('../src/routes/posts');

// 配置 session，passport 所需的基础，必须有
app.use(session({
    // 你喜欢的任意名字作为一个加密用的字符串
    secret: 'Aloha',
    resave: false,
    saveUninitialized: false
}));

// 初始化调用 passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=============================
//=========MIDDLEWARE==========
//=============================
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    // res.locals.success = req.flash('success');
    // res.locals.error = req.flash('error');
    next();
});

//=============================
//=====IMPORT   ROUTES=========
//=============================
app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
});