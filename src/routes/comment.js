const express = require('express');
const passport = require('passport');
const Comment = require('../model/comment');
const Post = require('../model/post');
const app = express();

//middleware
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,POST,GET,PUT,DELETE');
    next();
});

//Comments New
app.get("/", (req, res) => {
    Comment.find()
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

//Comments Create
app.post("/", (req, res) => {
    //lookup post using ID
    Post.findById(req.params.id, (err, post) => {
        if(err){
            console.log(err);
            //jump to homepage
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    post.comment.push(comment);
                    post.save();
                    //console.log(comment);
                    req.flash('success', 'Created a comment!');
                    // res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});