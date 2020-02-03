var express = require('express');
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
    res.render('books', 
    {
        title:'Library', 
        nav,
        books
    });
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
