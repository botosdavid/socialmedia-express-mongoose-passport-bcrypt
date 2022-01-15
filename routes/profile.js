const express = require('express');
const { nameValidation , emailValidation, passwordValidation, descriptionValidation} = require('../javascript/Joi');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post')


router.get('/', async (req,res) => {
    try{
        const posts = await Post.find({user: req.user._id}).populate(['comments.user']).populate('user').populate(['likes']).exec();
        res.status(200).render('loggedin/profile/profile', {posts: posts,user: req.user});
    }catch{
        res.redirect('/feed');
    }
})


router.get('/editname', (req,res) => {
    res.status(200).render('loggedin/profile/editname.ejs', {user: req.user});
})

router.put('/editname', async (req,res) => {
    //joi input validation
    const validationResult = nameValidation(req.body);
    const {error} = validationResult;
    if(error){
        let e = {};
        e.error = error.details[0].message;
        return res.status(400).render('loggedin/profile/editname.ejs', { messages: e, user: req.user})
    }
    //update user's new name
    try{
        const user = await User.findById(req.user._id);
        user.name = req.body.name;
        await user.save();
        res.redirect('/profile');
    }catch(e){
        res.redirect('/profile/editname');
    }
   
})

router.get('/editemail', (req,res) => {
    res.status(200).render('loggedin/profile/editemail.ejs', {user: req.user});
})

router.put('/editemail', async (req,res) => {
    // joi email validation
    const {error} = emailValidation(req.body);
    if(error){
        let e = {};
        e.error = error.details[0].message;
        return res.status(400).render('loggedin/profile/editemail.ejs', {messages: e, user: req.user});
    }
    //check if email is already taken
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists && emailExists.email !== req.user.email){
        let e = {};
        e.error = 'Email already taken!';
        return res.status(400).render('loggedin/profile/editemail.ejs', {messages: e, user: req.user});
    } 
    //updating email
    try{
        const user = await User.findById(req.user._id);
        user.email = req.body.email;
        await user.save();
        res.redirect('/profile');
    }catch{
        res.redirect('/profile/editemail');
    }
})

router.get('/editpassword', (req,res) => {
    res.render('loggedin/profile/editpassword.ejs');
})

router.put('/editpassword', async (req,res) => {
    //check if current password is correct
    const correctPassword = await bcrypt.compare(req.body.currentpassword, req.user.password);
    if(!correctPassword){
        let e = {};
        e.error = "Password not matching!";
        return res.status(400).render('loggedin/profile/editpassword.ejs', {messages: e});
    }
    //joi password validation
    const {error} = passwordValidation(req.body);
    if(error){
        let e = {};
        e.error = error.details[0].message;
        return res.status(400).render('loggedin/profile/editpassword.ejs', {messages: e});
    }
    // bcrypt new password for database
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //update hashed password in database
    try{
        const user = await User.findById(req.user._id);
        user.password = hashedPassword;
        await user.save();
        res.redirect('/profile');
    }catch{
        res.redirect('/profile/editpassword');
    }
})

router.get('/editimage', (req,res) => {
    res.render('loggedin/profile/editimage.ejs');
})

router.put('/editimage', async (req,res) => {
    const imageURL = req.body.profileImg;
    function checkURL(imageURL) {
        return(imageURL.match(/(jpeg|jpg|gif|png)$/) != null);
    }
    if(!imageURL){
        return res.redirect('/profile');
    }
    if(!checkURL(imageURL)){
        let e = {};
        e.error = "URL must be valid picture (jpeg/jpg/png)";
        return res.status(400).render('loggedin/profile/editimage.ejs', { messages: e });
    }
    try{
        const user = await User.findById(req.user._id);
        user.profileImg = imageURL;
        await user.save();
        res.redirect('/profile');
    }catch{
        res.redirect('/profile');
    }
})

router.get('/editdescription', (req,res) => {
    res.render('loggedin/profile/editdescription.ejs');
})

router.put('/editdescription', async (req,res) => {
    const {error} = descriptionValidation(req.body);
    if(error){
        let e = {};
        e.error = error.details[0].message;
        return res.status(400).render('loggedin/profile/editdescription.ejs', {messages: e});
    }
    try{
        const user = await User.findById(req.user._id);
        user.description = req.body.description;
        await user.save();
        res.redirect('/profile');
    }catch{
        res.redirect('/profile');
    }
})

router.delete('/logout', (req,res) => {
    req.logOut();
    res.redirect('/login');
})

module.exports = router;