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
			}