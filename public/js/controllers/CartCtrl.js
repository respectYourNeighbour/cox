angular.module('main_app').controller('CartCtrl', function($scope, $state, toastr, ContentService, LoginService, CartService) {
    console.log("CartCtrl controller");
    $scope.cart = CartService.cart;

    console.log("$scope.cart",$scope.cart)
});
