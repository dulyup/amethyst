const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    content: String,
    image: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
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

module.exports = new mongoose.Model('Post', PostSchema);
