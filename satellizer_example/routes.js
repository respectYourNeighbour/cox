var User = require('./models/user');
var moment = require('moment')
var jwt = require('jwt-simple');
var config = require('./config');
module.exports = function(app, db) {
    /*
     |--------------------------------------------------------------------------
     | Login Required Middleware
     |--------------------------------------------------------------------------
     */
    function ensureAuthenticated(req, res, next) {
        console.log("req.headers",req.headers)
        if (!req.headers.authorization) {
            return res.status(401).send({
                message: 'Please make sure your request has an Authorization header'
            });
        }
        var token = req.headers.authorization.split(' ')[1];
        console.log("token",token)

        var payload = null;
        try {
            payload = jwt.decode(token, config.TOKEN_SECRET);
            console.log("payload",payload)
        } catch (err) {
            return res.status(401).send({
                message: err.message
            });
        }

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: 'Token has expired'
            });
        }
        req.user = payload.sub;
        next();
    }

    /*
     |--------------------------------------------------------------------------
     | Generate JSON Web Token
     |--------------------------------------------------------------------------
     */
    function createJWT(user) {
        var payload = {
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, config.TOKEN_SECRET);
    }

    /*
     |--------------------------------------------------------------------------
     | GET /api/me
     |--------------------------------------------------------------------------
     */
    app.get('/api/me', ensureAuthenticated, function(req, res) {
        User.findById(req.user, function(err, user) {
            res.send(user);
        });
    });

    /*
     |--------------------------------------------------------------------------
     | PUT /api/me
     |--------------------------------------------------------------------------
     */
    app.put('/api/me', ensureAuthenticated, function(req, res) {
        User.findById(req.user, function(err, user) {
            if (!user) {
                return res.status(400).send({
                    message: 'User not found'
                });
            }
            user.displayName = req.body.displayName || user.displayName;
            user.email = req.body.email || user.email;
            user.save(function(err) {
                res.status(200).end();
            });
        });
    });


    /*
     |--------------------------------------------------------------------------
     | Log in with Email
     |--------------------------------------------------------------------------
     */
    app.post('/auth/login', function(req, res) {
        User.findOne({
            email: req.body.email
        }, "+password",function(err, user) {
            console.log("err",err)
            console.log("user",user)
             if (!user) {
                console.log("!user")
                return res.status(401).send({
                    message: 'Wrong email and/or password'
                });
            }

            user.comparePassword(req.body.password, function(err, isMatch) {
                if (!isMatch) {
                    return res.status(401).send({
                        message: 'Wrong email and/or password'
                    });
                }
                console.log("password matc")
                res.send({
                    token: createJWT(user)
                });
            });
        });
    });

    /*
     |--------------------------------------------------------------------------
     | Create Email and Password Account
     |--------------------------------------------------------------------------
     */
    app.post('/auth/signup', function(req, res) {
        console.log("signup",User)
        console.log("req.body.email",req.body.password)
        User.findOne({
            email: req.body.email
        }, function(err, existingUser) {
            if (existingUser) {
                return res.status(409).send({
                    message: 'Email is already taken'
                });
            }
            var user = new User({
                displayName: req.body.displayName,
                email: req.body.email,
                password: req.body.password
            });
            user.save(function() {
                res.send({
                    token: createJWT(user)
                });
            });
        });
    });
}