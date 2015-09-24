var LoginCtrl = function($rootScope, $scope, $state, Auth) {
	console.log("login controller");
				$scope.login = function() {
					var user = {
						username: $scope.username,
						password:$scope.password
					}
					console.log("user",user)
					console.log("login clicked")
					/*Auth.login(user, function(data){
						console.log("data?!?!",data)
					})*/
					Auth.login(user).then(function(response) {
						console.log("response",response)
					})
					// /$rootScope.$broadcast('authorized');
				}
}