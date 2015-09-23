var express = require('express'),
	app = express(),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	MongoClient = require('mongodb').MongoClient,
	routes = require('./routes'),
	path = require('path'),
	port = 3000;

MongoClient.connect('mongodb://localhost:27017/fridge', function(err, db) {
	"use strict";
	if(err) throw err;

	app.engine('html', cons.swig);
	app.set('view engine','html');
	app.set('views', __dirname + '/views');

	app.use(express.static(path.join(__dirname, 'public')));

	app.use(cookieParser());
	app.use(bodyParser());

	routes(app,db);

	app.listen(port);
	console.log("Express server listening on port : " + port);
})
