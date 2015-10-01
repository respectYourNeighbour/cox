angular.module('main_app').service('LoginService', function($http, $rootScope, $auth, $state,UserService) {
        var service = this;
        service.isAuthenticated = function() {
            return $auth.isAuthenticated();
        }
        service.login =  function(user) {
            console.log("login")
            return $auth.login(user);
        };
        service.logout = function() {
            console.log("logout in LoginService")
            //$cookies.remove("session");
            return $auth.logout();
        }
        service.signup = function(user) {
            console.log("signup")
            return $auth.signup(user);
        }
        service.setToken = function(token) {
            console.log("setToken")
            return $auth.setToken(token);
        }
})