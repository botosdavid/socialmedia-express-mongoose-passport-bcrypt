const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    registerDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    profileImg:{
        type: String,
        default: "https://us.123rf.com/450wm/happyvector071/happyvector0711904/happyvector071190414500/120957417-creative-illustration-of-default-avatar-profile-placeholder-isolated-on-background-art-design-grey-p.jpg?ver=6"
    },
    description:{
        type: String,
        default: 'No description yet.'
    }
})

module.exports = mongoose.model('User', userSchema);