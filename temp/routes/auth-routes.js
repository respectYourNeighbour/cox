var UsersDAO = require('../DAO/users').UsersDAO
var SessionsDAO = require('../DAO/sessions').SessionsDAO
var jwt = require('jwt-simple')
var tokens = []
var bcrypt = require('bcrypt-nodejs');
module.exports = function(app, db) {
    console.log("routes authroutes.js")

    var users = db.collection("users");
    var sessions = new SessionsDAO(db);
    var dbUserObj;


    app.post('/login', function(req, res, next) {
        console.log("handleLogin")
        var username = req.body.username || '';
        var password = req.body.password || '';

        if(password == '') {
            console.log("password empty",password)
        }
        if(password == undefined) {
            console.log("password undefined",password)
        }
        if(username == '' || password == '') {

            res.status(401).json({
                "status" : 401,
                "data" : "Empty credentials"
            });
            return;
        }

        validateLogin(username, password, function(data){
            console.log("data",data)
            dbUserObj = data;

            console.log("dbUserObj",dbUserObj);
            if(!dbUserObj) {
                console.log("!dbUserObj")
                res.status(401).json({
                    "status" : 401,
                    "data" : "Invalid credentials"
                });
                return;
            }
            if(dbUserObj) {
                if(dbUserObj.error) {
                    console.log("user has error", dbUserObj.error)
                    res.status(401).json({
                        "status" : 401,
                        "data" : dbUserObj.error
                    })
                }
                res.json(genToken(dbUserObj));
            }


        })


    });

        //console.log("user submitted username: " + username + " pass: " + password);

       /* users.validateLogin(username, password, function(err, user) {
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
            	var expires = new Date();
                expires.setDate((new Date()).getDate() + 0.9);
                var token = jwt.encode({
                    userName : username,
                    expires : expires
                }, app.get('jwtTokenSecret'))
                tokens.push(token);

                res.status(200).send({access_token : token, userName : username})
            }
        })
    })
*/





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

    app.get('/recipes', requiresAuthentication, function(request, response) {
        response.json([{'nume' : 'mustar'},{ 'nume' : 'faina'},{ 'nume' : 'zahar'}]);
    })



    function requiresAuthentication(req, res, next) {
        console.log("req",req.body)
        console.log(req.headers);
          // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.

  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
  console.log("token",token)
  if (token || key) {
    try {
      var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
      console.log("decoded",decoded)

      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }

      // Authorize the user to see if s/he can access our resources

      var dbUser = validateUser(decoded.user.username); // The key would be the logged in user's username
      if (dbUser) {

        console.log("dbUser is validated",dbUser
            )
        if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
          next(); // To move to next middleware
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
          return;
        }
      } else {
        // No user with this name exists, respond back with a 401
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid User"
        });
        return;
      }

    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }

        /*if (request.headers.access_token) {
            console.log("tokens.length",tokens.length)
            var token = request.headers.access_token;

            if (tokens.indexOf(token) != -1) {
                var decodedToken = jwt.decode(token, app.get('jwtTokenSecret'));
                console.log("decodedToken.expires",new Date(decodedToken.expires))
                 console.log("new Date()",new Date())
                if (new Date(decodedToken.expires) > new Date()) {
                    console.log("next")
                    next();
                    return;
                } else {
                    console.log("expired")
                    removeFromTokens();
                    response.status(401).end('Your session is expired');
                }
            } else {
                console.log("here11111")

            }
        }
        response.end('401', "No access token found in the request");*/
    }

    function genToken(user) {
        var expires = expiresIn(7); // 7 days
        var token = jwt.encode({
            exp: expires,
            user : user
        }, app.get('jwtTokenSecret'));

        return token;
    }

    function expiresIn(numDays) {
        var dateObj = new Date();
        return dateObj.setDate(dateObj.getDate() + numDays);
    }

    function validateLogin(username, password, callback) {
            console.log("validateLogin")
            var dbUserObj;
            users.findOne({'_id' : username}, function(err, user) {
                if(err) {
                    console.log("err",err)
                    /*dbUserObj = {
                        error : "Error occured" + err
                    };*/
                    callback(dbUserObj);
                }
                if(user) {
                    console.log("user found",user)
                    if (bcrypt.compareSync(password, user.password)) {
                        dbUserObj = {
                            username : username
                        }
                    } else {
                        /*dbUserObj = {
                            error : "Invalid password"
                        }*/
                    }
                } else {
                    console.log("user not found")
                    /*dbUserObj = {
                        error : "User does not exist"
                    }*/
                }
                console.log("validateLogin",dbUserObj)
                callback(dbUserObj);
            })
        }

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

    app.get('/logout', function(req,res,next){
        console.log("/////////logout")
        var token = req.headers.access_token;
        removeFromTokens(token);
        res.sendStatus(200);
    })

    function removeFromTokens(token) {
    console.log("token",token)
    for (var counter = 0; counter < tokens.length; counter++) {
        if (tokens[counter] === token) {
            tokens.splice(counter, 1);
            console.log("removed")
            break;
        }
    }
}
}