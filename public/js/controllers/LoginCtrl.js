angular.module('main_app').controller('LoginCtrl', function($rootScope, $scope, $state, LoginService, UserService) {
    console.log("login controller");
    $scope.login = function() {
        var user = {
            username: $scope.username,
            password: $scope.password
        }
        LoginService.login(user).then(function(response) {
        	console.log("function response",response);
        	UserService.setCurrentUser(user);
        	$rootScope.$broadcast('authorized');
        	if ($rootScope.toState) {
	            console.log("has to State")
	            $state.go($rootScope.toState);
	        } else {
	            console.log("else")
	            $state.go('main')
	        }
        })
        console.log("user", user)
        console.log("login clicked")
    }
});