const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content: {
        type: String
    },
    image: {
        type: String
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        avatarImg: String,
    },
    like: {
        type: Number,
        default: 0
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    create_on: {
        type: Date,
        default: Date.now
    }
});

//PS: lowercase of mongoose.model, not mongoose.Model
module.exports = mongoose.model("Post", PostSchema);

