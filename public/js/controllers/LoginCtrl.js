angular.module('main_app').controller('LoginCtrl', function($rootScope, $scope, $state, $cookies, LoginService, UserService) {
    console.log("login controller");

    $scope.login_username_error = false;
    $scope.login_password_error = false;
    $scope.login = function() {
        var user = {
            username: $scope.username,
            password: $scope.password
        }
        $scope.login_username_error = false;
        LoginService.login(user).then(function(response) {
        	console.log("function response",response);
        	if(response.data.no_such_user) {
        		//console.log("response.data.no_such_user")
        		$scope.login_username_error = true;
        	} else if(response.data.invalid_password){
        		//console.log("response.data.invalid_password")
        		$scope.login_password_error = true;
        	} else {
        		//console.log("user found")
        		UserService.setCurrentUser(user);
	        	$rootScope.$broadcast('authorized');
	        	$cookies.putObject("session",user.username)
	        	console.log("cookies",$cookies.getAll())
	        	if ($rootScope.toState) {
		            //console.log("has to State")
		            $state.go($rootScope.toState);
		        } else {
		            //console.log("else")
		            $state.go('main')
		        }
        	}
        })
        console.log("user", user)
        console.log("login clicked")
    }
});