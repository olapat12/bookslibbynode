var {MongoClient, ObjectID} = require('mongodb');
const debug = require('debug')('app:bookcontroller');

function bookController(nav){

    function getIndex(req, res){

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
        
            }
    

         function getbyId(req, res){

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
        }

        function middleware(req, res, next){
            if(req.user){
                next();
            }
            else{
                res.redirect('/');
            }
        }
        return{
            getIndex,
            getIndex,
            middleware
        }
    }

    
module.exports = bookController;