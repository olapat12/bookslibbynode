var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var sql = require('mssql');
var debug = require('debug');
var async = require("async")
var urlenconded = require('url');
var bodyparser = require('body-parser');
var json = require('json');
var logger = require('logger');
var methodOveride = require('method-override');
var nano = require('nano')('http://localhost:5984');
var mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient;

var db = nano.use('address');

// ticket@smartweb.com.ng

var app = express();



app.set('port', process.env.PORT || 900);


// Connect to the db
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


var con = mysql.createConnection({
    host: "localhost",
    user: "hbstudent",
    password: "hbstudent",
    database : "nodeapp"
});

con.connect(function(err){
    if(!err){
        console.log("connected successfully")
    }
    else{
        console.log("can't connect")
    }
})

 /*const config = {
    user: 'user',
    password: 'Meekkid20',
    server: 'bookslibrary.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'mybooklib',

     option: {
         encrypt : true
     }
};

sql.connect(config).
then(data => console.log('Connected to Database'))
.catch(err =>
    debug(err)
); */


/* const executeQuery = function (res, query, books) {

    dbConfig = {
        user: "user",
        password: "Meekkid20",
        server: "bookslibrary.database.windows.net",
        database: "bookslibrary"
    }

    sql.connect(dbConfig).then(pool => {

        return pool.request().query(query)

    }).then(result => {

        res.send(result);

        }).catch(err => {

            res.send(err);


    });
}*/


// Connect to the db


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(methodOveride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));

const nav = [
    {link: '/books', title: 'book'},
    {link: '/authors', title: 'author'}
];

const bookRouter = require('./routes/bookRoutes')(nav);
const adminRouter = require('./routes/adminRouter')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', routes.index);

app.get('/', (req, res) => {
    res.render('index')
})

/*app.post('/createdb', function(req,res){
    nano.db.create(req.body.dbname, function(err){
        if(err){
            res.send("Error creating database "+ req.body.dbname);
            return;
        }
        res.send("Database " + req.body.dbname + " created successfully");
    })
}); */




http.createServer(app).listen(app.get('port'), function () {
    console.log("Listening on port " + app.get('port'))
})