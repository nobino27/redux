var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

