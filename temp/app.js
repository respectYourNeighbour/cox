var express = require('express'),
	app = express(),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	MongoClient = require('mongodb').MongoClient,
	//routes = require('./routes'),
	path = require('path'),
	port = 8080;

MongoClient.connect('mongodb://localhost:27017/fridge', function(err, db) {
	"use strict";
	if(err) throw err;

	app.engine('html', cons.swig);
	app.set('view engine','html');
	app.set('views', __dirname + '/views');

	app.use(express.static(path.join(__dirname, 'public')));

	app.use(cookieParser());
	app.use(bodyParser());

	app.set('jwtTokenSecret', '123456ABCDEF');

	//routes(app,db);
	require('./routes/auth-routes.js')(app, db); // load our routes and pass in our app and fully configured passport
	require('./routes/asd.js')(app, db); // load our routes and pass in our app and fully configured passport




	app.listen(port);
	console.log("Express server listening on port : " + port);
})


/*


http://www.sitepoint.com/implementing-authentication-angular-applications/
https://docs.angularjs.org/api/ng/service/$q
https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec

http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543

http://thejackalofjavascript.com/architecting-a-restful-node-js-app/


+comments








*********************************

https://github.com/lynndylanhurley/ng-token-auth
https://github.com/mikemclin/angular-acl

**********************************



*/