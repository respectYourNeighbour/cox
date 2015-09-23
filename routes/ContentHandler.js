var LOG_TAG = "ContentHandler";
var UsersDAO = require('../DAO/users').UsersDAO
function ContentHandler(db) {

	var users = new UsersDAO(db);

	this.isLoggedInMiddleware = function(req, res, next) {
        console.log("isLoggedInMiddleware");
        var session_id = req.cookies.session;
        console.log("session_id : " + session_id)
        return next();
        /*sessions.getUsername(session_id, function(err, username) {
            "use strict";
            console.log("username : " + username)
            if (!err && username) {
                req.username = username;
            }
            return next();
        });*/
    }

    this.handleLogin = function(req,res,next) {
    	console.log("handleLogin")
    	var username = req.body.username;
        var password = req.body.password;

        console.log("user submitted username: " + username + " pass: " + password);
        console.log("users",users)
        users.validateLogin(username, password, function(err, user) {
        	if(err) {
        		console.log("err", err)
        	}

        	console.log("returned user", user)
        })
    }

    this.handleSignup = function(req,res,next) {
    	console.log("handleSignup")
    	var username = req.body.username;
        var password = req.body.password;

        users.addUser(username, password, function(err, user) {
            "use strict";

                if (err) {
                    // this was a duplicate
                    if (err.code == '11000') {
                        errors['username_error'] = "Username already in use. Please choose another";
                        return res.render("signup", errors);
                    }
                    // this was a different error
                    else {
                        return next(err);
                    }
                }
                console.log("signup user",user)
            });
    }

    this.displayLoginForm = function(req, res, next) {
		"use strict";
		console.log(LOG_TAG, "displayLoginForm")
		return res.send('login.html');
	}

	this.displayMainPage = function(req, res, next) {
		"use strict";
		console.log(LOG_TAG, "displayMainPage")
		return res.render('index.html');
	}

	this.returnAllIngredients = function(req, res, next) {
		console.log(LOG_TAG, "returnAllIngredients")
		res.render('index.html');
		//res.json([{'nume' : 'mustar'},{ 'nume' : 'faina'},{ 'nume' : 'zahar'}]);
	}

	this.loadRecipesFromSelectedIngredients = function(req,res,next){
		console.log("loadRecipesFromSelectedIngredients")
		console.log("req.query.ingrediente",req);
		/*db.collection('recipes').find().toArray(function(err,items){
			console.log("items",items)
		})*/
			db.collection('recipes').find({
				$and : [
					{ingredienteNecesare : {
						$in : req.body.ingrediente
					}},
					{ingredienteNecesare : {
						$nin : req.body.restrictii
					}}
				]

			}).toArray(function(err, items){
				console.log("---------------",items)
				res.json(items);
			});

		//res.json("am primit");
	}

	this.displayNewRecipe = function(req,res,next){
		console.log("displayNewRecipe")
	}

	this.handleNewRecipe = function(req,res,next){
		console.log("handleNewRecipe")
	}
}

var LOG_TAG = "ContentHandler";
var UsersDAO = require('../DAO/users').UsersDAO
function ContentHandler(db) {

	var users = new UsersDAO(db);

	this.isLoggedInMiddleware = function(req, res, next) {
        console.log("isLoggedInMiddleware");
        var session_id = req.cookies.session;
        console.log("session_id : " + session_id)
        return next();
        /*sessions.getUsername(session_id, function(err, username) {
            "use strict";
            console.log("username : " + username)
            if (!err && username) {
                req.username = username;
            }
            return next();
        });*/
    }

    this.handleLogin = function(req,res,next) {
    	console.log("handleLogin")
    	var username = req.body.username;
        var password = req.body.password;

        console.log("user submitted username: " + username + " pass: " + password);
        console.log("users",users)
        users.validateLogin(username, password, function(err, user) {
        	if(err) {
        		console.log("err", err)
        	}

        	console.log("returned user", user)
        })
    }

    this.handleSignup = function(req,res,next) {
    	console.log("handleSignup")
    	var username = req.body.username;
        var password = req.body.password;

        users.addUser(username, password, function(err, user) {
            "use strict";

                if (err) {
                    // this was a duplicate
                    if (err.code == '11000') {
                        errors['username_error'] = "Username already in use. Please choose another";
                        return res.render("signup", errors);
                    }
                    // this was a different error
                    else {
                        return next(err);
                    }
                }
                console.log("signup user",user)
            });
    }

    this.displayLoginForm = function(req, res, next) {
		"use strict";
		console.log(LOG_TAG, "displayLoginForm")
		return res.send('login.html');
	}

	this.displayMainPage = function(req, res, next) {
		"use strict";
		console.log(LOG_TAG, "displayMainPage")
		return res.render('index.html');
	}

	this.returnAllIngredients = function(req, res, next) {
		console.log(LOG_TAG, "returnAllIngredients")
		res.render('index.html');
		//res.json([{'nume' : 'mustar'},{ 'nume' : 'faina'},{ 'nume' : 'zahar'}]);
	}

	this.loadRecipesFromSelectedIngredients = function(req,res,next){
		console.log("loadRecipesFromSelectedIngredients")
		console.log("req.query.ingrediente",req);
		/*db.collection('recipes').find().toArray(function(err,items){
			console.log("items",items)
		})*/
			db.collection('recipes').find({
				$and : [
					{ingredienteNecesare : {
						$in : req.body.ingrediente
					}},
					{ingredienteNecesare : {
						$nin : req.body.restrictii
					}}
				]

			}).toArray(function(err, items){
				console.log("---------------",items)
				res.json(items);
			});

		//res.json("am primit");
	}

	this.displayNewRecipe = function(req,res,next){
		console.log("displayNewRecipe")
	}

	this.handleNewRecipe = function(req,res,next){
		console.log("handleNewRecipe")
	}
}

module.exports = ContentHandler;