angular.module('main_app').controller('SignUpCtrl', function($scope, LoginService) {
    console.log("SignUpCtrl controller");
    $scope.signup = function() {
        var user = {
            username: $scope.username,
            password: $scope.password
        }
        console.log("user", user)
        console.log("signup clicked")
        LoginService.signup(user).then(function(data){
        	console.log("then signup",data)
        }).catch(function(data){
        	console.log("catch signup",data)
        	toastr.error(response.data.message);
        });
    }
});

/*
var SignUpCtrl = function($rootScope, $scope, $state, Auth) {
console.log("signup controller");
				$scope.signup = function() {
					var user = {
						username: $scope.username,
						password:$scope.password
					}
					console.log("user",user)
					console.log("signup clicked")
					Auth.signup(user);
				}
			}*/