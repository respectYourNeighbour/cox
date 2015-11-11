angular.module('main_app').service('CartService', function($http, $rootScope, $state, $auth, LoginService, toastr) {
	console.log("CartService")
    var service = this;
    this.cart = new cart(LoginService, toastr);

})