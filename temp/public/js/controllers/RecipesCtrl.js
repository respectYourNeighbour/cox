angular.module('main_app').controller('RecipesCtrl', function($scope,$state,$rootScope,$http,UserService, LoginService) {
    console.log("RecipesCtrl controller");

    $scope.currentUser = UserService.getCurrentUser();


    $scope.getRecipes = function() {
    	console.log("getRecipes() clicked")
    	$http.get('/recipes').then(function(data){
    		console.log("data",data)
    	}, function(error){
    		console.log("error",error)
    		alert(error.data);
    		LoginService.logout().then(function(response) {
	            $scope.currentUser = UserService.setCurrentUser(null);
	            $rootScope.$broadcast('authorized');
	            $state.go('main');
	            console.log("je suis acqui111")
	        });
    	})
    }
});
/*
var RecipesCtrl = function($rootScope, $scope, Auth) {
	console.log("state1 controller");
				$scope.Auth = Auth;
}*/