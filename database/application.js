var connect = require('connect');
var app = connect();
var serveStatic = require('serve-static');
app.use(serveStatic('../inventory'));
app.listen(5000);
var server = require('./server');


console.log("Application is listening to port 5000.");
