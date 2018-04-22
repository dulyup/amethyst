const express = require('express');
const passport = require('passport');
const Comment = require('../model/comment');
const Post = require('../model/post');
const app = express();

//middleware
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,POST,GET,PUT,DELETE');
    next();
});

app.get('/', (req, res) => {
    Comment.find()
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

//Get commentList list by commentList id
app.get("/:commentId", (req, res) => {
    console.log(req.params.commentId);
    Comment.findById(req.params.commentId)
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
        })
});

//Create new commentList
app.post("/:postId", (req, res) => {
    const comment = req.body.comment;
    const author = {
        id: '5ad55b9bcb72a528adada93e',
        username: 'Ben',
        avatarImg: 'http://www.ilgiornale.it/sites/default/files/foto/2015/06/02/1433229388-gatto.jpg'
    };
    const newComment = new Comment({content: comment, author: author});
    //lookup post using ID
    Post.findById(req.params.postId).populate("comment")
        .exec()
        .then(post => {
            if (post) {
                newComment.save()
                    .then(doc => {
                        res.status(200).send(doc);
                    });
                post.comment.push(newComment);
                post.save();
            } else {
                res.status(404).send({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).send(e);
        });
});

app.delete('/:commentId/postId/:postId', (req, res) => {
    //lookup post using ID
    Post.findById(req.params.postId).populate("comment")
        .exec()
        .then(post => {
            if (post) {
                Comment.remove({_id: req.params.commentId})
                    .then(doc => {
                        res.status(200).send(doc);
                    });
                post.comment.remove(req.params.commentId);
                post.save();
            } else {
                res.status(404).send({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({e});
        });
});

// Get commentList list by post id
app.get("/postId/:postId", (req, res) => {
    //find the campground with provided ID
    Post.findById(req.params.postId).populate("commentList")
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc.commentList);
                res.status(200).send(doc.commentList);
            } else {
                res.status(404).send({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({error: e});
        })
});

module.exports = app;
