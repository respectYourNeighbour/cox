angular.module('MyApp').controller('LoginCtrl', function($scope, $location, $auth, toastr) {
    $scope.login = function() {
        $auth.login($scope.user)
            .then(function() {
                toastr.success('You have successfully signed in');
                $location.path('/');
            })
            .catch(function(response) {
                toastr.error(response.data.message, response.status);
            });
    };
});