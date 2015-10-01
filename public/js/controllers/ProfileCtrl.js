angular.module('main_app').controller('ProfileCtrl', function($scope, AccountService) {
    console.log("ProfileCtrl controller");

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