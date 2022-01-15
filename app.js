if(process.env.NODE_ENV !== 'production' ){
    require('dotenv').config();
}

//import node modules
const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//passport modules
const passport = require('passport');
const flash = require('express-flash');
// const session = require('express-session');
const session = require('cookie-session');

//passport auth modules
const {isLoggedIn, isLoggedOut} = require('./javascript/auth.js');

//passport middlewares and uses
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//view engine setup
app.use(express.static (__dirname + '/public'));
app.use(express.json())
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(methodOverride('_method'));

//import routes
const indexRoute = require('./routes/index');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const profileRoute = require('./routes/profile');
const searchRoute = require('./routes/search');
const feedRoute = require('./routes/feed');

//authentification middlewares for passport
app.use('/profile', isLoggedIn);
app.use('/search', isLoggedIn);
// app.use('/feed', isLoggedIn);
app.use('/register', isLoggedOut);
app.use('/login', isLoggedOut);


//set route middlewares
app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/profile', profileRoute);
app.use('/search',searchRoute);
app.use('/feed', feedRoute);

//connection to mongodb databse
mongoose.connect(process.env.DATA_BASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to DataBase');
})

//server starting
app.listen(PORT, () => {
    console.log('Server Running...');
})