var express = require('express');
var app = express();
var path = require('path');

var users = new(require("./features/database/users"));

app.use(express.static(__dirname + '/../frontend'));

app.listen(process.env.PORT || 5000, function(req, res) {
    console.log('Example app listening on port 5000!');
});

app.get("/api/users", function() {
    users.getAll();
})
app.get('*', function(req, res) {
    res.sendFile(path.resolve('frontend/app/index.html'));
});
