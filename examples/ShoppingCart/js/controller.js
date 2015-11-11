'use strict';

// the storeController contains two objects:
// - store: contains the product list
// - cart: the shopping cart object
function storeController($scope, $routeParams, DataService) {
	console.log("here")
    // get store and cart from service
    $scope.store = DataService.store;
    $scope.cart = DataService.cart;
    console.log("$routeParams",$routeParams.productSku)
    // use routing to pick the selected product
    if ($routeParams.productSku != null) {
    	console.log("$routeParams",$routeParams.productSku)
        $scope.product = $scope.store.getProduct($routeParams.productSku);
    }
}
