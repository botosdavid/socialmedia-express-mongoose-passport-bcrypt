const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const posts = await Post.find().sort({'date': 'desc'}).populate(['comments.user']).populate('user').populate(['likes']).exec();
        res.render('loggedin/feed/index.ejs', {posts: posts, user: req.user});
    }catch{
        res.redirect('/profile');
    }
})

router.post('/', async (req,res) => {
    const post = new Post({
        text: req.body.post,
        user: req.user._id
    })

    try{
        const savedPost = await post.save();
        res.redirect('/feed');
    }catch{
        res.redirect('/profile')
    }
})

router.put('/:id', async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        post.comments.push({ message: req.body.message, user: req.user._id, date: Date.now() });
        await post.save();
        res.redirect('back');
    }catch{
        res.redirect('/feed');
    }
})

router.put('/:id/like', async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.likes.includes(req.user._id)){
            const tmp = post.likes.filter( element => element.toString() != req.user._id );
            post.likes = tmp;
        }else{
            post.likes.push(req.user._id);
        }
        await post.save();
        res.reload(true);
    }catch{
        res.redirect('back');
    }
    
})

router.delete('/:id', async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        await post.remove();
        res.redirect('back');
    }catch{
        res.redirect('/feed');
    }
})

module.exports = router;