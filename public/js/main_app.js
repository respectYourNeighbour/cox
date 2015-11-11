angular.module('main_app', ['ui.router','toastr', 'satellizer','ngTagsInput','ui.bootstrap']).config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider,$interpolateProvider) {
    console.log("here")
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            controller:'HomeCtrl',
            templateUrl:'partials/home',
            resolve : {
                ingredients : function(ContentService){
                    return ContentService.getIngredients();
                },
                recipes : function(ContentService) {
                    return ContentService.getAllRecipes();
                }
            }
        })
        .state('login', {
            url: '/authentication',
            templateUrl: 'partials/login',
            controller: 'LoginCtrl',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .state('signup', {
            url: '/authentication',
            templateUrl: 'partials/signup',
            controller: 'SignUpCtrl',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .state('state1', {
            url: '/state1',
            templateUrl: 'partials/state1',
            controller: 'RecipesCtrl',
            resolve : {
                ingredients : function($http){
                    return $http.get('/recipes')
                }
            }
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'partials/profile',
            controller: 'ProfileCtrl',
            resolve : {
                loginRequired : loginRequired
            }
        })
        .state('single_recipe', {
            url: '/myrecipe/:ID',
            templateUrl: 'partials/single_recipe',
            controller: 'SingleRecipeCtrl',
            resolve : {
                dataForRecipe : function($http, $stateParams, ContentService) {
                    console.log("$stateParams",$stateParams)
                    return ContentService.getRecipe($stateParams.ID)
                }
            }
        })
        .state('cart', {
            url: '/cart',
            templateUrl: 'partials/cart',
            controller: 'CartCtrl',
            resolve : {
                loginRequired : loginRequired
            }
        })

    $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: true
	});

    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    function loginRequired($q, $location, $auth, LoginService) {
        console.log("loginRequired")
        var deferred = $q.defer();
        console.log("deferred",deferred)
        if (LoginService.isAuthenticated()) {
            console.log("loginRequired LoginService.isAuthenticated")
            deferred.resolve();
        } else {
            console.log("else go to login")
            $location.path('/authentication');
        }
        return deferred.promise;
    }
    function skipIfLoggedIn($q, $auth, LoginService) {
        console.log("skipIfLoggedIn")
        var deferred = $q.defer();
        console.log("deferred",deferred)
        if (LoginService.isAuthenticated()) {
            console.log("user logged in")
            deferred.reject();
        } else {
            console.log("user not logged in");
            deferred.resolve();
        }
        return deferred.promise;
    }
}).run(function($rootScope,$state, LoginService) {
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		console.log("stateChangeSuccess")
	})
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		console.log("stateChangeStart")
		/*if(toState.authenticate) {
			//console.log("requires authenticate",toState)
			if(LoginService.isLoggedIn()) {
				console.log("is LoggedIn")
			} else {
				//console.log("not logged in")
				$rootScope.toState = toState;
        		$rootScope.toParams = toParams;
        		//console.log("$rootScope.toState : ",$rootScope.toState)
				event.preventDefault();
				$state.go('login');
			}

		} else {
			//console.log("route does not require authenticate : ",toState)
		}*/
	})
});