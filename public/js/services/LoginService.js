angular.module('main_app').service('LoginService', function($http, $rootScope, $auth, $state,UserService) {
        var service = this;
        service.isLoggedIn = function() {
            //$cookies.remove("session");
            //console.log("isLoggedIn",$cookies.getAll())
            /*if($cookies.get("session")) {
                return true;
            } else {
                return false;
            }*/
        }
        service.login =  function(user) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>login")
            //console.log("cookies",$cookies)
            //return $http.post('/auth/login', user);
            return $auth.login(user);
        };
        service.logout = function() {
            console.log("logout in LoginService")
            //$cookies.remove("session");
            return $auth.logout();
        }
        service.signup = function(user) {
            console.log("signup")
            return $http.post('/signup', user);
            /*.success(function(user) {
                UserService.setCurrentUser(user);
            })*/
        }
})