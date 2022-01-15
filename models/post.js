const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    comments:{
        type: [{ message: String,
                 user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
                date: {type: Date, default: Date.now}  }],
        default: [],
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema)