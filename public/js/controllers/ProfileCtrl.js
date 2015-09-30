angular.module('main_app').controller('ProfileCtrl', function($scope,AccountService) {
    console.log("RecipesCtrl controller");

    $scope.getProfile = function() {
        AccountService.getMe()
            .then(function(response) {
            	console.log("response")
                $scope.user = response.data;
            })
            .catch(function(response) {
                toastr.error(response.data.message, response.status);
            });
    };

    $scope.getProfile();

});
/*
var RecipesCtrl = function($rootScope, $scope, Auth) {
	console.log("state1 controller");
				$scope.Auth = Auth;
}*/