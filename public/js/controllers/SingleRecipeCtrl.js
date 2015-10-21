angular.module('main_app').controller('SingleRecipeCtrl', function($scope, $state, toastr, ContentService) {
    console.log("SingleRecipeCtrl controller");
    //console.log("dataForRecipe",dataForRecipe)
   // $scope.recipe = dataForRecipe.data;
    $scope.recipe = {
    	"name" : "lorem ipsum",
    	"body" : "more details about this recipe"
    }
});
