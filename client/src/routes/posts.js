const express = require('express');
const Post = require('../model/post');
const app = express();
const isLoggedIn = require('../middleware');

//middleware
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,POST,GET,PUT,DELETE');
    next();
});

/**
 * Get all posts
 */
app.get('/', isLoggedIn, (req, res) => {
    Post.find()
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

app.get('/:username', isLoggedIn, (req, res) => {
    // Post.find({ "author.username": req.params.username})
    Post.find()
        .exec()
        .then(doc => {
            if (doc) {
                const list = [];
                for (let i = 0; i < doc.length; i++) {
                    if (doc[i].author.username === req.params.username) {
                        list.push(doc[i]);
                    }
                }
                res.status(200).send(list);
            } else {
                res.status(404).send({message: 'No valid entry found for provided username'});
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).send({error: e});
        });
});

/**
 * Add new post
 */
app.post('/', isLoggedIn, (req, res) => {
    const content = req.body.content;
    const image = req.body.image;
    const author = {
        id: req.session.loginInfo.id,
        username: req.session.loginInfo.username,
        avatarImg: req.session.loginInfo.avatar,
    };
    const post = new Post({content: content, image: image, author: author});
    post.save()
        .then(doc => {
            console.log(doc);
            res.status(200).send(doc);
        })
        .catch(e => console.log(e));
    // //TODO: check the result of save, and send status of res
});

/**
 * Update post
 */
app.put("/:id", isLoggedIn, (req, res) => {
    const newData = {content: req.body.content, image: req.body.image};
    Post.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatePost){
        if(err){
            req.flash("error", err.message);
        } else {
            req.flash("success","Successfully Updated!");
        }
    });
});

/**
 * Delete post by id
 */
app.delete('/:id', isLoggedIn, (req, res) => {
    Post.remove({_id: req.params.id})
        .exec()
        .then(doc => res.status(200).send(doc))
        .catch(e => {
            console.log(e);
            res.status(500).send({error: e})
        });
});

module.exports = app;

