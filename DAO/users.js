var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user')
var moment = require('moment')
var jwt = require('jwt-simple');
var config = require('../config');
/* The UsersDAO must be constructed with a connected database object */
function UsersDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof UsersDAO)) {
        //console.log('Warning: UsersDAO constructor called without "new" operator');
        return new UsersDAO(db);
    }

    var users = db.collection("users");

    this.addUser = function(email, password, callback) {
        "use strict";

        User.findOne({
            email: email
        }, function(err, existingUser) {
            if (existingUser) {
                var email_taken = new Error("Email already taken");
                return callback(email_taken, null);
                /*return res.status(409).send({
                    message: 'Email is already taken'
                });*/
            }
            var user = new User({
                displayName: 'username ' + email,
                email: email,
                password: password
            });
            user.save(function() {
                console.log("user save",user)
                return callback(null, createJWT(user))
                /*res.send({
                    token: createJWT(user)
                });*/
            });
        });
    }

    this.validateLogin = function(email, password, callback) {
        "use strict";

        User.findOne({
            email : email
        }, "+password", function(err, user){
            if(!user){
                var wrong_email_or_password = new Error("Wrong email and/or password");
                return callback(wrong_email_or_password, null);
            }
            user.comparePassword(password, function(err, isMatch) {
                if (!isMatch) {
                    var wrong_email_or_password = new Error("Wrong email and/or password");
                    return callback(wrong_email_or_password, null);
                }
                console.log("password match")
                return callback(null, createJWT(user));
            });
        })
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
}

module.exports.UsersDAO = UsersDAO;
