const express = require('express');

const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);

//path location stratergy

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/project/index.html'));
});


console.log('The app is running :)');
