angular.module('main_app').controller('SignUpCtrl', function($scope, $state, toastr, LoginService) {
    console.log("SignUpCtrl controller");
    $scope.signup = function() {
        LoginService.signup($scope.user).then(function(response) {
            console.log("SignUpCtrl function response",response);
            toastr.success('You have successfully signed up');
            LoginService.login($scope.user).then(function(response) {
                LoginService.setToken(response);
                toastr.success('You have successfully signed in');
                $state.go('home');
            }).catch(function(response) {
                toastr.error(response.data.message, response.status);
                console.log("SignUpCtrl response",response)
            });
        }).catch(function(response) {
            toastr.error(response.data.message, response.status);
            console.log("response",response)
        })
    }
});
