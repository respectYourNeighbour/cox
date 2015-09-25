angular.module('main_app').service('UserService', function($http, $rootScope, $state) {
        var service = this,
            currentUser = null;
        service.setCurrentUser = function(user) {
            currentUser = user;
            return currentUser;
        };
        service.getCurrentUser =  function() {
            return currentUser;
        }
})