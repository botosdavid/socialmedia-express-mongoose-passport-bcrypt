const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


router.get('/', async (req,res) => {
    try{
        const users = await User.find();
        res.render('index/index', { users: users , layout: '../views/layouts/authLayout', error: {} });
    }catch{
        res.render('index/index')
    }
})

module.exports = router;