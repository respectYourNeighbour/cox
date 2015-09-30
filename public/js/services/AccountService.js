//var SessionsDAO = require('../DAO/sessions').SessionsDAO
angular.module('main_app').service('AccountService', function($http, $rootScope, $state, $auth) {
        var service = this;
        service.getMe = function() {
            return $http.get('/api/me');
        }
})