
const isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

const isLoggedOut = (req,res,next) => {
    if(req.isAuthenticated()){
        return res.redirect('/profile');
    }
    next();
}

module.exports.isLoggedIn = isLoggedIn;
module.exports.isLoggedOut = isLoggedOut;