var LOG_TAG = "ContentHandler";
var UsersDAO = require('../DAO/users').UsersDAO
var User = require('../models/user')
function ContentHandler(db) {

    var users = new UsersDAO(db);

    this.returnAllIngredients = function(req, res, next) {
        console.log(LOG_TAG, "returnAllIngredients")
        //res.render('index.html');
        res.json([{'nume' : 'mustar'},{ 'nume' : 'faina'},{ 'nume' : 'zahar'}]);
    }

    this.myProfile = function(req, res, next){
        console.log("req.user",req.user)
        User.findById(req.user, function(err, user) {
            res.send(user);
        });
    }
}

module.exports = ContentHandler;