angular.module('main_app').controller('CartCtrl', function($scope, $state, toastr, ContentService, LoginService, dataForRecipe) {
    console.log("CartCtrl controller");
    console.log("dataForRecipe",dataForRecipe)
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
    		toastr.error("You are not logged in. <a href='/authentication'>Login</a> here",{
    			allowHtml : true
    		});
    	}
    }
});
