angular.module('main_app').service('UserService', function($http, $rootScope, $state, $auth) {
        var service = this;
        service.getMe = function() {
            return $http.get('/api/me');
        }
})