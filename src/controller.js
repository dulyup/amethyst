const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const flash = require('connect-flash');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json({ extended: true, type: '*/*' }) );
app.use(express.static(path.resolve(__dirname, '../react-react-ui/build')));
app.use(cookieParser('secret'));
app.use(flash());

mongoose.connect("mongodb://localhost:27017/sharing");
mongoose.connection.on('open', function () {
    console.log('-----------db Connect Successfully！------------');
});

//requiring routes
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

app.use(session({
    secret: 'Aloha',
    cookie:{maxAge: 60*1000*60*24*14}, //expiration: millisecond
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

//=============================
//=====IMPORT   ROUTES=========
//=============================
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
});