const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user')
const {loginValidation} = require('./Joi');

const passportSetup = (passport) => {
    const authenticateUser = async (email,password,done) => {
        //joi validation
        const userObject = {email, password};
        const {error} = loginValidation(userObject);
        if(error){
            return done(null, false, {message: error.details[0].message});
        }
        //check if email exists in database
        const user = await User.findOne({ email: email})
        if(user == null){
            return done(null, false,{message: "Email not found"})
        }
        //check if the password is correct for that email
        try{
            const correctPassword = await bcrypt.compare(password, user.password);
            if(!correctPassword){
                return done(null, false, {message: 'Incorrect Password'});
            }else{
                return done(null, user);
            }
        }catch(e){
            done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id,done) => {
        User.findById(id, function(err, user) {
            done(err, user);
        })
    });
}

module.exports = passportSetup;