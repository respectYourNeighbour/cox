//var SessionsDAO = require('../DAO/sessions').SessionsDAO
angular.module('main_app').service('UserService', function($http, $rootScope, $state, $window) {
        var service = this,
            currentUser = null;
        //var sessions = new SessionsDAO(db);
        service.setCurrentUser = function(user) {
            currentUser = user;
            return currentUser;
        };
        service.getCurrentUser =  function() {
            console.log("currentUser",currentUser)
            /*$http.get('/getUserFromSession').then(function(data){
                console.log("then function data",data)
                currentUser = data;

            });*/
            return currentUser;

        }

        function init() {
            if ($window.sessionStorage["userInfo"]) {
                currentUser = JSON.parse($window.sessionStorage["userInfo"]);
                console.log("init currentUser",currentUser)
            }
        }
        init();
})