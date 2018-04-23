const isLoggedIn = require('../middleware');
const express = require('express');
const Comment = require('../model/comment');
const Post = require('../model/post');
const app = express();

//middleware
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'https://amethysts.herokuapp.com');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,POST,GET,PUT,DELETE');
    next();
});


/**
 * Get all comments
 */
app.get('/', isLoggedIn, (req, res) => {
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

/**
 * Get comment by id
 */
app.get("/:commentId", isLoggedIn, (req, res) => {
    Comment.findById(req.params.commentId)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).send(doc);
            } else {
                res.status(404).send({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(e => {
            res.status(500).send({error: e});
        })
});

/**
 * Create new comment
 */
app.post("/:postId", isLoggedIn, (req, res) => {
    const comment = req.body.comment;
    const author = {
        id: req.session.loginInfo.id,
        username: req.session.loginInfo.username,
        avatarImg: req.session.loginInfo.avatar,
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

app.delete('/:commentId/postId/:postId', isLoggedIn, (req, res) => {
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

/**
 * Look up commentList list by post id
 */
app.get("/postId/:postId", isLoggedIn, (req, res) => {
    //find the campground with provided ID
    Post.findById(req.params.postId).populate("comment")
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc.comment);
                res.status(200).send(doc.comment);
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
