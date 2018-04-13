const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json({ extended: true, type: '*/*' }) );
app.use(express.static(path.resolve(__dirname, '../react-react-ui/build')));

mongoose.connect("mongodb://localhost:27017/sharing");

//requiring routes
const userRoutes = require('../src/routes/users');
const postRoutes = require('../src/routes/posts');

//=============================
//=====IMPORT   ROUTES=========
//=============================
app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
});