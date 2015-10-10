angular.module('main_app').controller('NavbarCtrl', function($scope, $state, LoginService, toastr) {
    console.log("NavbarCtrl controller");

    $scope.logout = function() {
        LoginService.logout().then(function(response) {
            toastr.info('You have been logged out');
            $state.go('home')
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

    $scope.isAuthenticated = function() {
        //console.log("NavbarCtrl isAuthenticated",LoginService.isAuthenticated())
        return LoginService.isAuthenticated();
    };

});
