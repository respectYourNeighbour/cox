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




/*

DOCUMENTATION FILES

https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
http://www.frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/
https://thinkster.io/mean-stack-tutorial
https://github.com/angular-ui/ui-router
http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html
http://solidfoundationwebdev.com/posts/require-authentication-for-certain-routes-with-ui-router-in-angularjs
https://medium.com/@mattlanham/authentication-with-angularjs-4e927af3a15f





*/