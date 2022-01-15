const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

router.get('/', async (req,res) => {
    let users;
    let searchOptions = {};
    try{
        if(req.query.searchinput){
            searchOptions.name = new RegExp(req.query.searchinput, 'i')
        }
        users = await User.find(searchOptions).sort({ registerDate: 'desc'}).exec();
    }catch{
        users = [];
    }
    res.render('loggedin/search/index.ejs', {users: users, searchOptions: req.query.searchinput});
    
})

router.get('/:id', async (req,res) => {
    let user;
    try{
        profileUser = await User.findById(req.params.id);
        const posts = await Post.find({ user: profileUser.id}).populate(['comments.user']).populate('user').populate(['likes']).exec();
        return res.render('loggedin/search/show.ejs', {posts: posts ,user: req.user, profileUser: profileUser });
    }catch{
        user = {};
    }
    res.render('loggedin/search/show.ejs', {posts: posts ,user: user});
})

module.exports = router;