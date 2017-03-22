/*jshint node:true*/
'use strict';

var connect = require('connect');
var serveStatic = require('serve-static');
var port = process.env.PORT || 8080;
var environment = process.env.NODE_ENV;

var app = connect();

console.log('About to launch NodeJS Server...');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch(environment) {
  case 'build':
    //console.log('** BUILD **');
    app.use(serveStatic('./public/'));
    app.use('/*', serveStatic('./public/index.html'));
    break;
  default:
    //console.log('** DEV **');
    app.use(serveStatic('./src/client/'))
    app.use(serveStatic('./'))
    app.use(serveStatic('./tmp'));
    app.use('/*', serveStatic('./src/client/index.html'));
}

app.listen(port, function() {
  console.log('Server listening on ' + port);
  console.log('http://localhost:' + port + '/');
  /*
  console.log('__dirname = ' + __dirname +
              '\nprocess.cwd = ' + process.cwd()); */
});
