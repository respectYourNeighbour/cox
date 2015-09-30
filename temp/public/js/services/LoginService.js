angular.module('main_app').service('LoginService', function($http, $rootScope, $state,UserService,$window) {
        var service = this;
        service.isLoggedIn = function() {
            //$cookies.remove("session");
            //console.log("isLoggedIn",$cookies.getAll())
            if(UserService.getCurrentUser() != null){
                return true;
            } else {
                return false;
            }
        }
        service.login =  function(user) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>login")
            //console.log("cookies",$cookies)
            return $http.post('/login', user);
        };
        service.logout = function() {
            console.log("logout in LoginService")
            $window.sessionStorage["userInfo"] = null;
            userInfo = null;
            UserService.setCurrentUser(null)
            return $http.get('/logout');
        }
        service.signup = function(user) {
            console.log("signup")
            return $http.post('/signup', user);
        }
})