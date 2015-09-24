var UsersDAO = require('../DAO/users').UsersDAO
module.exports = function(app, db) {
	console.log("routes authroutes.js")

	var users = new UsersDAO(db);


	app.post('/login', function(req, res, next){
		console.log("handleLogin")
    	var username = req.body.username;
        var password = req.body.password;

        console.log("user submitted username: " + username + " pass: " + password);
        console.log("users",users)
        users.validateLogin(username, password, function(err, user) {
        	if (err) {
                if (err.no_such_user || err.invalid_password) {
                    res.json(err);
                }
                else {
                    // Some other kind of error
                    return next(err);
                }
            }
        	res.json(user);
        })
	})
	app.post('/signup', function(req, res, next){
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
	})
}