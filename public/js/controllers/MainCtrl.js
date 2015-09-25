angular.module('main_app').controller('MainCtrl', function($rootScope, $scope, $state, LoginService, UserService) {
    console.log("MainCtrl controller");
    var main = this;
    $rootScope.$on('authorized', function() {
         console.log("authorized");
        $scope.currentUser = UserService.getCurrentUser();
    });

    $scope.logout = function() {
        console.log("logout clicked");
        LoginService.logout();
    }

    showLeft.onclick = function() {
        $(this).toggleClass("active");
        $(this).toggleClass("effect1");
        $("#cbp-spmenu-s1").toggleClass("cbp-spmenu-open")
    };

    $(".cbp-spmenu a").on("click", function() {
        var $this = $(this),
            $links = $(".cbp-spmenu a");

        $links.removeClass("selected");
        $this.addClass("selected");
    });

    $scope.name = 'user';
    $scope.orderProperty = 'age';
    $scope.currentUser = UserService.getCurrentUser();
});