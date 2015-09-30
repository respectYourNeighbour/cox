/**
 * Satellizer Node.js Example
 * (c) 2015 Sahat Yalkabov
 * License: MIT
 */
var path = require('path');

var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var mongoose = require('mongoose')

var config = require('./config');
/*
MongoClient.connect('mongodb://127.0.0.1/fridge', function(err, db) {
    'user strict';

    if (err) throw err;
    
});*/

mongoose.connect('mongodb://127.0.0.1/fridge');
    var db = mongoose.connection;

    app.set('port', process.env.PORT || 3000);
    app.use(cors());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Force HTTPS on Heroku
    if (app.get('env') === 'production') {
        app.use(function(req, res, next) {
            var protocol = req.get('x-forwarded-proto');
            protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
        });
    }
    app.use(express.static(path.join(__dirname, './client')));

    //routes(app,db);
    require('./routes.js')(app, db); // load our routes and pass in our app and fully configured passport
    /*
    |--------------------------------------------------------------------------
    | Start the Server
    |--------------------------------------------------------------------------
    */
     app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });