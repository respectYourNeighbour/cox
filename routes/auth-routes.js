var UsersDAO = require('../DAO/users').UsersDAO
var SessionsDAO = require('../DAO/sessions').SessionsDAO
module.exports = function(app, db) {
    console.log("routes authroutes.js")

    var users = new UsersDAO(db);
    var sessions = new SessionsDAO(db);


    app.post('/login', function(req, res, next) {
        console.log("handleLogin")
        var username = req.body.username;
        var password = req.body.password;

        //console.log("user submitted username: " + username + " pass: " + password);
        users.validateLogin(username, password, function(err, user) {
            if (err) {
            	console.log("err found",err)
                if (err.no_such_user || err.invalid_password) {
                	//console.log("err.no_such")
                    res.json(err);
                } else {
                    // Some other kind of error
                    return next(err);
                }
            } else {
            	sessions.startSession(user['_id'], function(err, session_id) {
	                "use strict";

	                if (err) return next(err);
	                //console.log("started session with id : ",session_id)

	                //res.cookie('session', session_id);
	                //console.log("else user",user)
            		res.json(user);
	            });
            }
        })
    })
    app.post('/signup', function(req, res, next) {
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
            //console.log("signup user", user)
        });
    })

    app.get('/getUserFromSession', function(req, res, next) {
        console.log("getUserFromSession")
        var session_id = req.cookies.session;
        sessions.getUsername(session_id, function(err, username) {
            "use strict";

            if(err) console.log("getUserFromSession err",err)
            if(username) {
            	//console.log("getUserFromSession username",username)
            	return res.json(username);
            }
        });
    })
}