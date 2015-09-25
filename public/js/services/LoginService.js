angular.module('main_app').service('LoginService', function($http, $rootScope, $state, UserService) {
        var service = this;
        service.isLoggedIn = function() {
            return UserService.getCurrentUser();
        };
        service.login =  function(user) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>login")
            return $http.post('/login', user);
            /*$http.post('/login', user).success(function(user) {
                console.log("success", user)
                $rootScope.user = user;
                console.log("rootscope", $rootScope.user)


                _authenticated = true;
                console.log("_authenticated : " + _authenticated)
                $rootScope.$broadcast('authorized');
                if ($rootScope.toState)
                    $state.go($rootScope.toState);
                else $state.go('main')

s
                //success(user);
            }).error(function() {
                console.log("error")
            });*/
        };
        service.logout = function() {
            console.log("logout in LoginService")
            return true;
        }
        service.signup = function(user) {
            console.log("signup")
            return $http.post('/signup', user);
            /*.success(function(user) {
                UserService.setCurrentUser(user);
            })*/
        }
})