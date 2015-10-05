angular.module('main_app').controller('RecipesCtrl', function($scope, UserService, ingredients) {
    console.log("RecipesCtrl controller");

    console.log("ingredients are", ingredients)

    $scope.currentUser = UserService.getMe();
});