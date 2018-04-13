const Comment = require("../react-ui/src/model/comment");
const Post = require("../react-ui/src/model/post");

module.exports = {
    isLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You must be signed in first!");
    //TODO: jump to login page
    },

    checkUserPost: function(req, res, next) {
        if (req.isAuthenticated()) {
            User.findById(req.params.id, function(err, login){
                //TODO: create new user to DB in route/user.js
                if (login.author.id.equals(req.user.id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission");
                    console.log("no permission");
                    //TODO: jump to main page
                }
            });
        } else {
            req.flash("error", "You need to be signed in first!");
            //TODO: jump to login page
        }
    },

    checkUserComment: function(req, res, next) {
        if (req.isAuthenticated()) {
            Comment.findById(rea.params.commentId, function(err, commnet) {
                if (comment.author.id.equals(req.user.id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission");
                    console.log("no permission");
                    //TODO: jump to main page
                }
            });
        } else {
            req.flash("error", "You need to be signed in first!");
            //TODO: jump to login page
        }
    }
};
