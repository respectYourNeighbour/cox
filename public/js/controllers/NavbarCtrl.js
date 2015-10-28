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


    $scope.myVar = 123;

    /*showLeft.onclick = function() {
        $(this).toggleClass("active");
        $(this).toggleClass("effect1");
        $("body").toggleClass("show_sidebar");
    };*/

    /*$("#showLeftPush").on("click", function() {
        console.log(">>>>>>>>>>>>>>>click")
        $('body').toggleClass("cbp-spmenu-push-toright");
        $("#cbp-spmenu-s1").toggleClass("cbp-spmenu-open")
    });*/

$("#menu-toggle").click(function(e) {
  console.log("click 1")
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        //$("#showLeft").toggleClass("effect1");
    });

/*
$("#showLeft").click(function(e) {
  console.log("click 1")
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
         $(this).toggleClass("active");
        $(this).toggleClass("effect1");
    });
*/

     $("#menu-toggle-2").click(function(e) {
      console.log("click 2")
        e.preventDefault();
        $("#wrapper").toggleClass("toggled-2");
        $('#menu ul').hide();
    });


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

    $('[data-toggle="tooltip"]').tooltip();

});
