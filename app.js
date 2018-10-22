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

app.get('/blocks/:name', function(request, response) {
    var description = blocks[request.params.name];
    if (!description) {
        response.status(404).json('No descriptiobn found for ' + request.params.name);
    } else{
    
    response.json(description);
    }
});
        
app.listen(8080);