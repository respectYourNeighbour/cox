angular.module('main_app').controller('LoginCtrl', function($scope, $state, toastr, LoginService) {
    console.log("login controller");

    $scope.login = function() {
        LoginService.login($scope.user).then(function(response) {
        	console.log("function response",response);
            toastr.success('You have successfully signed in');
            $state.go('home');
        }).catch(function(response) {
            toastr.error(response.data.message, response.status);
            console.log("response",response)
        })
    }
});