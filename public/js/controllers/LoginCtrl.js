angular.module('main_app').controller('LoginCtrl', function($rootScope,$location, $scope, $state, toastr, LoginService) {
    console.log("login controller");

    $scope.login = function() {
        //$auth.login($scope.user)
        LoginService.login($scope.user).then(function(response) {
        	console.log("function response",response);
            toastr.success('You have successfully signed in');
            $location.path('/');
            //$state.go('main')


        	/*if(response.data.no_such_user) {
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
        	}*/
        }).catch(function(response) {
            toastr.error(response.data.message, response.status);
            console.log("response",response)
        })
        //console.log("user", user)
        //console.log("login clicked")
    }
});