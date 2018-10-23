var express = require('express');
var app = express();
app.use(express.static('public'));
var blocks = require('./routes/blocks');
app.use('/blocks/', blocks);


var locations = {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Penthouse'
};

app.get('/locations/:name', function(request, response) {
    var location = locations[request.blockName];
    if(!location) {
        response.status(404).json("No location found for " + request.params.name);
    } else {
    response.json(location);
    }
});

app.listen(process.env.PORT, process.env.IP, 8080, function(){
    console.log("You are listening on port 8080");
    
});

