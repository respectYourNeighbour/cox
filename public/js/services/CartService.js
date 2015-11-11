angular.module('main_app').service('CartService', function($http, $rootScope, $state, $auth, LoginService, toastr) {
	console.log("CartService")
    var service = this;
    if(this.cart == null) {
    	console.log("this cart is null")
    	this.cart = new cart("IngredientsCart",LoginService, toastr);
    } else {
    	console.log("this.cart is not null")
    }
    

})