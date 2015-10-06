var LOG_TAG = "ContentHandler";
var UsersDAO = require('../DAO/users').UsersDAO
var User = require('../models/user')
var ObjectId = require('mongoose').Types.ObjectId;
function ContentHandler(db) {

    var users = new UsersDAO(db);

    this.returnAllIngredients = function(req, res, next) {
        console.log("returnAllIngredients")
        //res.render('index.html');
        res.json([{'nume' : 'mustar'},{ 'nume' : 'faina'},{ 'nume' : 'zahar'}]);
    }

    this.getRecipes = function(req, res, next){
        console.log("getRecipes",req.query.ingredientsList[0])
        db.collection('recipes').find({
            ingredienteNecesare : {
                $in : req.query.ingredientsList
            }
        }).toArray(function(err,items) {
            console.log("err",err)
            console.log("----items",items)
            res.json(items);
        })
    }

    this.myProfile = function(req, res, next){
        console.log("req.user",req.user)
        User.findById(req.user, function(err, user) {
            res.send(user);
        });
    }

    this.getRecipeByID = function(req, res, next) {
        console.log("req",req.params.ID)
        db.collection('recipes').findOne({
            _id : ObjectId(req.params.ID)
        }, function(err, item){
            console.log("err",err)
            console.log("item",item)
            res.json(item)
        })
    }
}

module.exports = ContentHandler;