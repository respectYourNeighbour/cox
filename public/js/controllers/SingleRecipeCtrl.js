angular.module('main_app').controller('SingleRecipeCtrl', function($scope, $state, toastr, ContentService, dataForRecipe) {
    console.log("SingleRecipeCtrl controller");
    console.log("dataForRecipe",dataForRecipe)
    $scope.recipe = dataForRecipe.data;

});