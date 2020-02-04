var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var debug = require('debug')('app:adminRouter');
var async = require("async")
const adminRouter = express.Router();

var books = [{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Tolstoy',
    read: false
},
{
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
},
{
    title: 'The Good and The Bad',
    genre: 'Drama',
    author: 'John Smith',
    read: false
},
{
    title: 'Titanic',
    genre: 'Real life',
    author: 'Donovan Logan',
    read: false  
},
{
    title: 'The Gifted hand',
    genre: 'Real life',
    author: 'Wole Soyinka',
    read: false 
}]

function router(nav){

    adminRouter.route('/')
    .get((req, res)=>{

       // res.json(books)

        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

       (async function mongo(){
            let client;
            try{
                client = await MongoClient.connect(url);
                debug("I just connect to the server");

                const db = client.db(dbName);
                
          const response = await db.collection('books').insertMany(books);
                res.json(response);

            } catch(err){
                debug(err.stack);
            }
            client.close();
        }()) 

    });
    return adminRouter;
}


module.exports = router;