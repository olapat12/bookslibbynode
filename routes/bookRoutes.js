var express = require('express');
var sql = require('mssql')
var MongoClient = require('mongodb').MongoClient;
//var debug = require('debug')('app:adminRouter');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router()

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

function routerr(nav){
    bookRouter.route('/')
.get((req, res)=>{

    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

   (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url);
            debug("I just connect to the server");

            const db = client.db(dbName);
            
      const col = await db.collection('books');

      const books = await col.find().toArray();
   
        res.render('books', 
    {
        title:'Library', 
        nav,
        books
    });
    } catch(err){
        debug(err.stack);
    }
        client.close();
   }());

    });
    


bookRouter.route('/:id')
.get((req, res)=>{

    const id = req.params.id;

    res.render('book', 
    {
        title:'Library', 
        nav,
        book : books[id]
    });
});

return bookRouter;
}



module.exports = routerr;
