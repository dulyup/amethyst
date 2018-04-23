const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json({ extended: true, type: '*/*' }) );
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cookieParser('secret'));

const MONGO_URL = process.env.MONGO_URI || "localhost:27017/sharing";
mongoose.connect(`mongodb://${MONGO_URL}`);
mongoose.connection.on('open', function () {
    console.log('-----------db Connect Successfully！------------');
});

//requiring routes
const userRoutes = require('../client/src/routes/users');
const postRoutes = require('../client/src/routes/posts');
const commentRoutes = require('../client/src/routes/comments');

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