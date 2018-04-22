//middleware 用于此检测用户在post前有无登录
const express = require('express');
const Post = require('../model/post');
const middleware = require('../../server/middleware');
const app = express();

//middleware
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,POST,GET,PUT,DELETE');
    next();
});

app.get('/', (req, res) => {
    Post.find()
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

// app.content('/', middleware.isLoggedIn, (req, res) => {
app.post('/', (req, res) => {
    const content = req.body.content;
    const image = req.body.image;
    const author = {
        // id: req.user._id,
        id: '5ad82c878918284443728b2b',
        // username: req.user.user
        username: 'Amy',
        // avatarImg: req.user.avatarImg都应该是存在cookie中的，从req获取，而不是body
        avatarImg: 'http://cdn.shopify.com/s/files/1/2097/9875/products/LEGO-Mario-Odyssey-Square_1024x1024.jpg?v=1510066811'
    };
    const post = new Post({content: content, image: image, author: author});
    post.save()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(e => console.log(e));
    // //TODO: check the result of save, and send status of res
});

app.put("/:id", (req, res) => {
    const newData = {content: req.body.content, image: req.body.image};
    Post.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatePost){
        if(err){
            req.flash("error", err.message);
            // res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            // res.redirect("/campgrounds/" + campground._id);
        }
    });
});

app.delete('/:id', (req, res) => {
    Post.remove({_id: req.params.id})
        .exec()
        .then(result => res.status(200).json(result))
        .catch(e => {
            console.log(e);
            res.status(500).json({error: e})
        });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be signed in to do that!");
    //TODO: jump to login page
    // res.redirect("/login");
}

module.exports = app;

