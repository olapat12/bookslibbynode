exports.index = function(req, res){
    
    res.render('index', 
    {
        title:'Library', 
        nav: [
            {link: '/books', title: 'books'},
            {link: '/authors', title: 'authors'}
        ]
    });
};