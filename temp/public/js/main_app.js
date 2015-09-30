angular.module('main_app', ['ui.router']).config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    //console.log("here")
    $httpProvider.interceptors.push('TokenInterceptor')
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: "partials/home.html",
            controller: "MainCtrl",
            resolve : {
                currentUser : function(UserService) {
                    return UserService.getCurrentUser();
                }
            }
        })
        .state('main.login', {
            url: 'authentication',
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        })
        .state('main.signup', {
            url: 'authentication',
            templateUrl: 'partials/signup.html',
            controller: 'SignUpCtrl'
        })
        .state('main.state1', {
            url: 'state1',
            templateUrl: 'partials/state1.html',
            controller: 'RecipesCtrl',
            authenticate: true
        })
    $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
}).run(function($rootScope,$state, LoginService) {
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		//console.log("stateChangeSuccess")
	})
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		console.log("stateChangeStart")
		if(toState.authenticate) {
			//console.log("requires authenticate",toState)
			if(LoginService.isLoggedIn()) {
				console.log("is LoggedIn")
			} else {
				//console.log("not logged in")
				$rootScope.toState = toState;
        		$rootScope.toParams = toParams;
        		//console.log("$rootScope.toState : ",$rootScope.toState)
				event.preventDefault();
				$state.go('main.login');
			}

		} else {
			//console.log("route does not require authenticate : ",toState)
		}
	})
});