angular.module('main_app', ['ui.router','toastr', 'satellizer','ngTagsInput']).config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
    //console.log("here")
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            controller:'HomeCtrl',
            templateUrl:'partials/home.html'
        })
        .state('login', {
            url: '/authentication',
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .state('signup', {
            url: '/authentication',
            templateUrl: 'partials/signup.html',
            controller: 'SignUpCtrl',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .state('state1', {
            url: '/state1',
            templateUrl: 'partials/state1.html',
            controller: 'RecipesCtrl',
            resolve : {
                ingredients : function($http){
                    return $http.get('/recipes')
                }
            }
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'partials/profile.html',
            controller: 'ProfileCtrl',
            resolve : {
                loginRequired : loginRequired
            }
        })
    $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

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
    function skipIfLoggedIn($q, $auth) {
        var deferred = $q.defer();
        if (LoginService.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }
}).run(function($rootScope,$state, LoginService) {
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		//console.log("stateChangeSuccess")
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