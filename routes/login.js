const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportSetup = require('../javascript/passport');
passportSetup(passport);


router.get('/',(req,res) => {
    res.render('login/login' , {layout: '../views/layouts/authLayout', error: {}});
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}))


module.exports = router;
