angular.module('main_app').controller('NavbarCtrl', function($rootScope, $scope, $state, $auth, LoginService,toastr, UserService) {
    console.log("NavbarCtrl controller");
    /*var main = this;
    $rootScope.$on('authorized', function() {
         console.log("authorized");
        $scope.currentUser = UserService.getCurrentUser();
    });
    $rootScope.$on('authorized', function() {
         console.log("authorized");
        $scope.currentUser = UserService.getCurrentUser();
    });

    $scope.logout = function() {
        //console.log("logout clicked");
        LoginService.logout().then(function(response) {
            $scope.currentUser = UserService.setCurrentUser(null);
            $state.go('main');
        });
    }

    $scope.loggedIn = function() {
        main.isLoggedIn = LoginService.isLoggedIn();
    }*/

    $scope.logout = function() {
        LoginService.logout().then(function(response) {
            toastr.info('You have been logged out');
            $state.go('home')
           // $location.path('/');
        }).catch(function(response){
            toastr.error(response.data.message, response.status);
        });
    }

    showLeft.onclick = function() {
        $(this).toggleClass("active");
        $(this).toggleClass("effect1");
        $("#cbp-spmenu-s1").toggleClass("cbp-spmenu-open")
    };

    $(".cbp-spmenu a").on("click", function() {
        console.log(">>>>>>>>>>>>>>>click")
        var $this = $(this),
            $links = $(".cbp-spmenu a");

        $links.removeClass("selected");
        $this.addClass("selected");
    });

    /*$scope.name = 'user';
    $scope.orderProperty = 'age';
    $scope.currentUser = UserService.getCurrentUser();
    main.isLoggedIn = LoginService.isLoggedIn();
    console.log("main.isLoggedIn",main.isLoggedIn )*/

    $scope.isAuthenticated = function() {
        //console.log("isAuthenticated",$auth.isAuthenticated())
        return $auth.isAuthenticated();
    };
});
