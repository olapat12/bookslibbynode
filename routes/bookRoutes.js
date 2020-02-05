var express = require('express');
var sql = require('mssql')
var {MongoClient, ObjectID} = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

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
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url);
            debug("I just connect to the server");

            const db = client.db(dbName);
            
      const col = await db.collection('books');
       const book = await col.findOne({_id: new ObjectID(id)});

       res.render('book', 
    {
        title:'Library', 
        nav,
        book 
    });

        } catch(err){
            debug(err.stack);
        }
    }())
});

return bookRouter;
}



module.exports = routerr;
