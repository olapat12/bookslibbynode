exports.index = function(req, res){
    
    res.render('index', 
    {
        title:'Library', 
        nav: [
            {link: '/books', title: 'book'},
            {link: '/authors', title: 'author'}
        ]
    });
};

//08035905422