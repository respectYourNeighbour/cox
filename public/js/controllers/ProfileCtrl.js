angular.module('main_app').controller('ProfileCtrl', function($scope,$state, AccountService, toastr) {
    console.log("ProfileCtrl controller");

    $scope.getProfile = function() {
        AccountService.getMe()
            .then(function(response) {
            	console.log("response")
                $scope.user = response.data;
            })
            .catch(function(response) {
                toastr.error(response.data.message, response.status);
                console.log("response",response)
                if(response.status == 401) {
                    $state.go('login');
                }
            });
    };

    $scope.getProfile();

});