var LOG_TAG = "AuthenticationHandler";
var UsersDAO = require('../DAO/users').UsersDAO
var User = require('../models/user')
var moment = require('moment')
var jwt = require('jwt-simple');
var config = require('../config');
function AuthenticationHandler(db) {

    var users = new UsersDAO(db);

    this.ensureAuthenticated = function(req, res, next) {
        console.log("ensureAuthenticated!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
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

    this.login = function(req, res, next) {
        console.log("/auth/login")
        var email = req.body.email;
        var password = req.body.password;

        users.validateLogin(email, password, function(err, generatedToken){
            if(!generatedToken) {
                console.log("!generatedToken. err.message : ", err.message)
                return res.status(401).send({
                    message : err.message
                });
            }
            console.log("login success",generatedToken)
            res.send({
                token : generatedToken
            });
        });
    }

    this.signup = function(req, res, next) {
        "use strict";
        console.log("/auth/signup")
        var email = req.body.email;
        var password = req.body.password;

        users.addUser(email, password, function(err, generatedToken) {
            "use strict";

            console.log("generatedToken",generatedToken)
            if(err) {
                console.log("err",err.message)
                return res.status(409).send({
                    message : err.message
                })
            }
            res.send({
                token : generatedToken
            });
        });
    }
}

module.exports = AuthenticationHandler;