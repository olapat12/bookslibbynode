exports.index = function(req, res){
    //var elo = "Stream"
    res.render('index', 
    {title:'Library', 
    elo: 'Stream', 
    list: ['Java','Python','C#','Javascript']});
};