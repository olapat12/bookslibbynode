var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var sql = require('mssql');
var debug = require('debug');
var async = require("async")
var urlenconded = require('url');
var bodyparser = require('body-parser');
const {Strategy} = require('passport-local'); 
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var json = require('json');
var logger = require('logger');
var methodOveride = require('method-override');
var nano = require('nano')('http://localhost:5984');
var mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient;

//var db = nano.use('address');

// ticket@smartweb.com.ng

var app = express();



app.set('port', process.env.PORT || 900);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./routes/config/passport')(app);
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
const authRouter = require('./routes/authRouter')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', routes.index);

app.get('/', (req, res) => {
    res.render('index')
});


http.createServer(app).listen(app.get('port'), function () {
    console.log("Listening on port " + app.get('port'))
})