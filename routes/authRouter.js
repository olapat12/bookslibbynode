var express = require('express');
var {MongoClient} = require('mongodb');
const debug = require('debug')('app:authRouter');
const {Strategy} = require('passport-local'); 
const passport = require('passport');

const authRouter = express.Router();

 function router(nav){
    authRouter.route('/signup')
    .post((req, res)=>{
       const {username, password} = req.body;
       const url = 'mongodb://localhost:27017';
       const dbName = 'libraryApp';

       (async function adduser(){

        let client;
        try{
            client = await MongoClient.connect(url);
            console.log('connected to server');
            const db = client.db(dbName);
            const col = db.collection('users');
            const user = {username, password};
            const result = await col.insertOne(user);

            req.login(result.ops[0], ()=>{
                res.redirect('/auth/profile');
            })

        } catch(err){
            debug(err.stack);
        }

       }())
        
    });

    authRouter.route('/signin')
    .get((req, res)=>{
        res.render('signIn',{
            nav,
            title: 'Sign in'
        });
    })
    .post(passport.authenticate('local',{
        successRedirect: '/auth/profile',
        failureRedirect: '/'
    }));

    authRouter.route('/profile')
    .get((req, res)=>{
        res.json(req.user)
    });

    return authRouter;
}

module.exports = router;
