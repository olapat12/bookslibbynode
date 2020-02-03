var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var urlenconded = require('url');
var bodyparser = require('body-parser');
var json = require('json');
var logger = require('logger');
var methodOveride = require('method-override');
var nano = require('nano')('http://localhost:5984');

var db = nano.use('address');



var app = express();



app.set('port', process.env.PORT || 900);
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

app.use('/books', bookRouter);
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