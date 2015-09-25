angular.module('main_app').controller('RecipesCtrl', function($scope,UserService) {
    console.log("RecipesCtrl controller");

    $scope.currentUser = UserService.getCurrentUser();
});
/*
var RecipesCtrl = function($rootScope, $scope, Auth) {
	console.log("state1 controller");
				$scope.Auth = Auth;
}*/