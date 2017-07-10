var express = require('express');
var app = express();
var path = require('path');

var port =3000;

app.use(express.static(path.join(__dirname, 'public/')));

app.listen(port, function() {
    console.log(`Sender listening on port 3000`);
});
