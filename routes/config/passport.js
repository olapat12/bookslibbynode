const passport = require('passport');
require('./localstrategy')();

module.exports = function passportConfig(app){

    app.use(passport.initialize()); 
    app.use(passport.session());
    passport.serializeUser((user, done)=>{
        done(null, user)
    }); // stores user in the session

    passport.deserializeUser((user, done)=>{
        done(null, user)
    }); //retrieve user from session

}