
angular.module('main_app', ['ui.router']).config(function($stateProvider, $urlRouterProvider,$locationProvider) {
	console.log("here")
	// For any unmatched route
	$urlRouterProvider.otherwise('/');


/*

most likely here it will be another structure
main
main.login
main.recipes
etc

*/

	$stateProvider
		.state('main', {
			url : '/',
			templateUrl: 'views/index.html',
            controller : MainCtrl
		})
		.state('main.login', {
			url : '/authentication',
			templateUrl: 'partials/login.html',
            controller : LoginCtrl
		})
		.state('main.signup', {
			url : '/authentication',
			templateUrl: 'partials/signup.html',
            controller : SignUpCtrl
		})
		.state('main.state1', {
			url : '/state1',
			templateUrl: 'partials/state1.html',
			controller : RecipesCtrl,
			authenticate : true
		})
		$locationProvider.html5Mode(true);
}).controller('NavbarCtrl',function($scope, Auth) {
	console.log("ooooooooooooooooooooooooooooNavbarCtrl")
	$scope.$watch('Auth._authenticated', function() {
		console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOO WATCH")
	})

}).run(function($rootScope,$state, Auth) {
	console.log("success")
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		console.log("stateChangeSuccess")
	})
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		console.log("stateChangeStart")
		if(toState.authenticate) {
			console.log("requires authenticate",toState)
			if(Auth.isLoggedIn()) {
				console.log("is LoggedIn")
			} else {






/*



// track the state the user wants to go to; authorization service needs this







				if (isAuthenticated) $state.go('accessdenied'); // user is signed in but not authorized for desired state
              else {
                // user is not authenticated. stow the state they wanted before you
                // send them to the signin state, so you can return them when you're done
                $rootScope.returnToState = $rootScope.toState;
                $rootScope.returnToStateParams = $rootScope.toStateParams;

                // now, send them to the signin state so they can log in
                $state.go('signin');
              }
*/

				$rootScope.toState = toState;
        		$rootScope.toParams = toParams;



        		console.log("$rootScope.toState : ",$rootScope.toState)
				event.preventDefault();
				$state.go('main.login');
			}

		} else {
			console.log("route does not require authenticate : ",toState)
		}
	})
});

angular.module('main_app').factory('Auth',function($http, $rootScope, $state, $timeout) {
	return {
		_authenticated : false,
		isLoggedIn : function() {
			if($rootScope.user === undefined) {
				console.log("user is undefined")
				return false;
			} else {
				console.log("user is logged in ",$rootScope.user);
				_authenticated = true;
				return _authenticated;
			}
		},
		login : function(user, callback) {
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>login")
			$http.post('/login', user).success(function(user){
				console.log("success",user)
				callback(user);
				$rootScope.user = user;
				console.log("rootscope",$rootScope.user)


				_authenticated = true;
				console.log("_authenticated : " + _authenticated)
				$state.go($rootScope.toState);


				//success(user);
			}).error(function() {
				console.log("error")
			});
		},
		signup : function(user) {
			console.log("signup")
			$http.post('/signup', user).success(function(user) {
				$rootScope.user = user;

			})
		}
	}
})