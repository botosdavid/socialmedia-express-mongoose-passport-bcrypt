const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { registerValidation } = require('../javascript/Joi');
const bcrypt = require('bcrypt');

router.get('/', (req,res) => {
    res.render('register/register.ejs', {layout: '../views/layouts/authLayout', messages: {}})
})

router.post('/', async (req,res) => {
    //joi input validation
    const validationResult = registerValidation(req.body);
    const {error} = validationResult;
    if(error){
        let e = {};
        e.error = error.details[0].message;
        return res.status(400).render('register/register.ejs', {layout: '../views/layouts/authLayout', messages: e})
    }
    //check if email already is registered in database
    const emailExists = await User.findOne({ email: req.body.email});
    if(emailExists){
        let e = {};
        e.error = "Email already taken!";
        return res.status(400).render('register/register.ejs', {layout: '../views/layouts/authLayout', messages: e})
    }
    //bcrypt password for storing in database
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //creating new user object 
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    //trying to save new user
    try{
        const savedUser = await newUser.save();
        res.redirect('/login')
    }catch(e){
        console.log(e);
        res.redirect('/register')
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        await user.remove();
        res.redirect('/register');
    }catch{
        res.redirect('/register');
    }
})  

module.exports = router;