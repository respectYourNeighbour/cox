angular.module('main_app').controller('SingleRecipeCtrl', function($scope, $rootScope, $state, toastr, ContentService, LoginService,CartService, dataForRecipe) {
    console.log("SingleRecipeCtrl controller");
    console.log("dataForRecipe",dataForRecipe)
    console.log("rootscope nringr : ", $rootScope.nrIngr)
    	$scope.cart = CartService.cart;


    $rootScope.nrIngr = 6;
   // $scope.recipe = dataForRecipe.data;
    $scope.recipe = dataForRecipe.data;

    $scope.rate = 3;//cate like-uri are
    $scope.maxStars = 5;
    console.log(LoginService.isAuthenticated())



    $scope.addIngredientToCart = function(id) {
    	if(LoginService.isAuthenticated()) {
    		console.log("clicked")
    	} else {
    		console.log("User trying to add ingredient to cart. Not logged in.")
    		toastr.error("You are not logged in. <a href='/authentication' style='color:blue'>Login</a> here",{
    			allowHtml : true
    		});
    	}
    }
});
