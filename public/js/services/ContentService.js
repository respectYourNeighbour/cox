angular.module('main_app').service('ContentService', function($http, $rootScope, $state, $auth) {
        var service = this;
        service.getIngredients = function() {
        	console.log("get ingredients service")
            return $http.get('/getIngredients');
        }
        service.getRecipes = function(ingredients) {
        	return $http.get('/recipes', {params : {ingredientsList : ingredients}})
        }
        service.getRecipe = function(ID) {
        	console.log("getRecipe by ID")
        	return $http.get('/recipe/' + ID);
        }
})