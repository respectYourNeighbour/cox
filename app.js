var express = require('express'),
	app = express(),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	//routes = require('./routes'),
	path = require('path'),
	cors = require('cors'),
	logger = require('morgan'),
	mongoose = require('mongoose'),
	config = require('./config'),
	port = 3000;
	//testing commit in git

	mongoose.connect('mongodb://127.0.0.1/fridge');
    var db = mongoose.connection;

    app.engine('html', cons.swig);
	app.set('view engine','html');
	app.set('views', __dirname + '/views');

    app.set('port', process.env.PORT || 3000);
    app.use(cors());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());

    // Force HTTPS on Heroku
    if (app.get('env') === 'production') {
        app.use(function(req, res, next) {
            var protocol = req.get('x-forwarded-proto');
            protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
        });
    }
    app.use(express.static(path.join(__dirname, 'public')));

    //routes(app,db);
	require('./routes/routes.js')(app, db); // load our routes and pass in our app and fully configured passport
    //require('./routes.js')(app, db); // load our routes and pass in our app and fully configured passport
    /*
    |--------------------------------------------------------------------------
    | Start the Server
    |--------------------------------------------------------------------------
    */
     app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });




/*

DOCUMENTATION FILES

https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
http://www.frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/
https://thinkster.io/mean-stack-tutorial
https://github.com/angular-ui/ui-router
http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html
http://solidfoundationwebdev.com/posts/require-authentication-for-certain-routes-with-ui-router-in-angularjs
https://medium.com/@mattlanham/authentication-with-angularjs-4e927af3a15f


http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication


http://onehungrymind.com/winning-http-interceptors-angularjs/

http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543


*/