var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));


var blocks ={
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a cirlce around its center'
};

var locations = {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Penthouse'
};

app.param('name', function(request, response, next) {
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLocaleLowerCase();
    
    request.blockName = block;
    
    next();
});

app.get('/blocks/:name', function(request, response) {
    var description = blocks[request.blockName];
    if (!description) {
        response.status(404).json('No descriptiobn found for ' + request.params.name);
    } else{
    
    response.json(description);
    }
});

app.get('/locations/:name', function(request, response){
    var location = locations[request.blockName];
        if(!location) {
        response.status(404).json("No location found for " + request.params.name);
    } else {
    response.json(location);
    }
});

app.get('/blocks', function(request, response){
    if (request.query.limit >= 0){
        response.json(blocks.slice(0, request.query.limit)); 
    } else {
    response.json(Object.keys(blocks));
    }
});
        
app.listen(8080);