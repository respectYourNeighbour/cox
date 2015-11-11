angular.module('main_app').controller('MainCtrl', function($rootScope, $scope, $state, LoginService, UserService, currentUser) {
    console.log("MainCtrl controller");
    var main = this;
    $scope.userInfo = currentUser;

    $rootScope.$on('authorized', function() {
         console.log("authorized");
        $scope.userInfo = UserService.getCurrentUser();
    });

    $rootScope.$on('unauthorized', function() {
         console.log("authorized");
        $scope.userInfo = UserService.setCurrentUser(null);
    });

    $scope.logout = function() {
        //console.log("logout clicked");
        LoginService.logout().then(function(response) {
            $scope.userInfo = UserService.setCurrentUser(null);
            $state.go('main');
            console.log("je suis acqui")
        });
    }

    /*$scope.loggedIn = function() {
        main.isLoggedIn = LoginService.isLoggedIn();
    }*/
});
