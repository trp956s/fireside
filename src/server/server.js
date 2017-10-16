/*jshint node:true*/
'use strict';

var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var http = require('http');
var port = process.env.PORT || 8080;
var environment = process.env.NODE_ENV;
var livereload = require('livereload');
var lrserver = livereload.createServer();

var app = express();

switch(environment) {
  case 'build':
    //console.log('** BUILD **');
    app.use(serveStatic('./public/'));
    app.use('/', serveStatic('./public/index.html'));
    app.use('/*', serveStatic('./public/index.html'));
    lrserver.watch('./public');
    break;
  default:
    //console.log('** DEV **');
    app.use(serveStatic('./src/client/index.html'))
      .use(serveStatic('./src/client/'))
      .use(serveStatic('./'))
      .use(serveStatic('./tmp'))
      //app.use('/', serveStatic('./src/client/index.html'));
      .use('/', serveStatic('./src/client/index.html'))
      //app.use('*', serveStatic('./src/client/index.html'));
      .use('/*', serveStatic('./src/client/index.html'));
      lrserver.watch('./src');
      lrserver.watch('./src/**/*.js');
}

app.listen(port, function() {
  console.log('Server listening on ' + port);
  console.log('http://localhost:' + port + '/');
});

