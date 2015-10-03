angular.module('main_app', ['ui.router','toastr', 'satellizer']).config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
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
            controller: 'LoginCtrl'
        })
        .state('signup', {
            url: '/authentication',
            templateUrl: 'partials/signup.html',
            controller: 'SignUpCtrl'
        })
        .state('state1', {
            url: '/state1',
            templateUrl: 'partials/state1.html',
            controller: 'RecipesCtrl',
            resolve : {
                ingredients : function($http){
                    return $http.get('/recipes', {cache: true})
                }
            }
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'partials/profile.html',
            controller: 'ProfileCtrl'
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
angular.module('main_app').service('AccountService', function($http, $rootScope, $state, $auth) {
        var service = this;
        service.getMe = function() {
            return $http.get('/api/me');
        }
})
angular.module('main_app').service('LoginService', function($http, $rootScope, $auth, $state,UserService) {
        var service = this;
        service.isAuthenticated = function() {
            return $auth.isAuthenticated();
        }
        service.login =  function(user) {
            console.log("login")
            return $auth.login(user);
        };
        service.logout = function() {
            console.log("logout in LoginService")
            //$cookies.remove("session");
            return $auth.logout();
        }
        service.signup = function(user) {
            console.log("signup")
            return $auth.signup(user);
        }
        service.setToken = function(token) {
            console.log("setToken")
            return $auth.setToken(token);
        }
})
angular.module('main_app').service('UserService', function($http, $rootScope, $state, $auth) {
        var service = this;
        service.getMe = function() {
            return $http.get('/api/me');
        }
})
angular.module('main_app').controller('HomeCtrl', function($scope, $http) {


        // content appear
        $('body').css('opacity', 1);
    
        // header 
        $('.animatedTextContainer').textition({
            map:      {x: 50, y: 20, z: 500},
            speed:    0.8,
            handler:  false,
            autoplay: true,
            interval: 3     
        });    


    $http.jsonp('https://api.github.com/repos/sahat/satellizer?callback=JSON_CALLBACK')
        .success(function(data) {
            if (data) {
                if (data.data.stargazers_count) {
                    $scope.stars = data.data.stargazers_count;
                }
                if (data.data.forks) {
                    $scope.forks = data.data.forks;
                }
                if (data.data.open_issues) {
                    $scope.issues = data.data.open_issues;
                }
            }
        });





});
angular.module('main_app').controller('ProfileCtrl', function($scope, AccountService) {
    console.log("ProfileCtrl controller");

    $scope.getProfile = function() {
        AccountService.getMe()
            .then(function(response) {
            	console.log("response")
                $scope.user = response.data;
            })
            .catch(function(response) {
                toastr.error(response.data.message, response.status);
            });
    };

    $scope.getProfile();

});
angular.module('main_app').controller('NavbarCtrl', function($scope, $state, LoginService, toastr) {
    console.log("NavbarCtrl controller");

    $scope.logout = function() {
        LoginService.logout().then(function(response) {
            toastr.info('You have been logged out');
            $state.go('home')
        }).catch(function(response){
            toastr.error(response.data.message, response.status);
        });
    }

    showLeft.onclick = function() {
        $(this).toggleClass("active");
        $(this).toggleClass("effect1");
        $("#cbp-spmenu-s1").toggleClass("cbp-spmenu-open")
    };

    $(".cbp-spmenu a").on("click", function() {
        console.log(">>>>>>>>>>>>>>>click")
        var $this = $(this),
            $links = $(".cbp-spmenu a");

        $links.removeClass("selected");
        $this.addClass("selected");
    });

    $scope.isAuthenticated = function() {
        //console.log("NavbarCtrl isAuthenticated",LoginService.isAuthenticated())
        return LoginService.isAuthenticated();
    };
});

angular.module('main_app').controller('LoginCtrl', function($scope, $state, toastr, LoginService) {
    console.log("login controller");

    $scope.login = function() {
        LoginService.login($scope.user).then(function(response) {
        	console.log("function response",response);
            toastr.success('You have successfully signed in');
            $state.go('home');
        }).catch(function(response) {
            toastr.error(response.data.message, response.status);
            console.log("response",response)
        })
    }
});
angular.module('main_app').controller('SignUpCtrl', function($scope, $state, toastr, LoginService) {
    console.log("SignUpCtrl controller");
    $scope.signup = function() {
        LoginService.signup($scope.user).then(function(response) {
            console.log("SignUpCtrl function response",response);
            toastr.success('You have successfully signed up');
            LoginService.login($scope.user).then(function(response) {
                LoginService.setToken(response);
                toastr.success('You have successfully signed in');
                $state.go('home');
            }).catch(function(response) {
                toastr.error(response.data.message, response.status);
                console.log("SignUpCtrl response",response)
            });
        }).catch(function(response) {
            toastr.error(response.data.message, response.status);
            console.log("response",response)
        })
    }
});

angular.module('main_app').controller('RecipesCtrl', function($scope, UserService, ingredients) {
    console.log("RecipesCtrl controller");

    console.log("ingredients are", ingredients)

    $scope.currentUser = UserService.getCurrentUser();
});
angular.module('main_app').directive('loading', ['$http' ,function ($http)
{
    return {
        restrict: 'A',
        link: function (scope, elm, attrs)
        {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                    elm.show();
                    console.log("still loading"+v)
                }else{
                    elm.hide();
                    //elm.remove();
                     console.log("done loading"+v)
                    //delete because i only want the loading screen when accessing the website not everytime a request is made
                }
            });
        }
    };

}]);