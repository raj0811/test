const express = require('express');
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');
const path =require('path');

const db = require('./config/mongoose');
const app=express();
const port = 8002;

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const passportLocal= require('./config/passport-local-strategy');


// const passportJWT = require('./config/passport-jwt-strategy')
// const passportGoogle= require('./config/passport-google-oauth2-strategy');




app.use(express.static('assets'));



app.use(expressLayouts);


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data


app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// setup view engin
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: "thesocialnetwork",
    secret: "jack",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (100 * 60 * 100)
    },
    store: new MongoDBStore(
        {
        
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        )
}));

app.use(passport.initialize());
app.use(passport.session());





app.use('/', require('./routes'));




app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port} `);
})