
angular.module('main_app', ['ui.router']).config(function($stateProvider, $urlRouterProvider,$locationProvider) {
	console.log("here")
	// For any unmatched route
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('main', {
			url : '/',
            controller : function($http,$scope) {
            	console.log("main controller")

			    showLeft.onclick = function() {
			        $(this).toggleClass("active");
			        $( this ).toggleClass( "effect1" );
			        $("#cbp-spmenu-s1").toggleClass("cbp-spmenu-open")
			    };

			    $(".cbp-spmenu a").on("click", function() {
			        var $this = $(this),
			            $links = $(".cbp-spmenu a");

			        $links.removeClass("selected");
			        $this.addClass("selected");
			    });

				$scope.name = 'user';
				$scope.orderProperty = 'age';
			}
		})
		.state('login', {
			url : '/authentication',
			templateUrl: 'partials/login.html',
            controller : function($scope, Auth) {
				console.log("login controller");
				$scope.login = function() {
					var user = {
						username: $scope.username,
						password:$scope.password
					}
					console.log("user",user)
					console.log("login clicked")
					Auth.login(user);
				}
			}
		})
		.state('signup', {
			url : '/authentication',
			templateUrl: 'partials/signup.html',
            controller : function($scope, Auth) {
				console.log("signup controller");
				$scope.signup = function() {
					var user = {
						username: $scope.username,
						password:$scope.password
					}
					console.log("user",user)
					console.log("signup clicked")
					Auth.signup(user);
				}
			}
		})
		.state('state1', {
			url : '/state1',
			templateUrl: 'partials/state1.html',
			controller : function() {
				console.log("state1 controller");
			},
			authenticate : true
		})
		$locationProvider.html5Mode(true);
}).run(function($rootScope,$state) {
	console.log("success")
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		console.log("stateChangeSuccess")
	})
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		console.log("stateChangeStart")
		if(toState.authenticate) {
			console.log("requires authenticate",toState)
			event.preventDefault();
			$state.go('login');
		} else {
			console.log("route does not require authenticate : ",toState)
		}
	})
});

angular.module('main_app').factory('Auth',function($http, $rootScope) {
	return {
		isLoggedIn : function(user) {
			if(user === undefined) {
				console.log("user is undefined")
			}
		},
		login : function(user) {
			console.log("login")
			$http.post('/login', user).success(function(user){
				$rootScope.user = user;
				success(user);
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