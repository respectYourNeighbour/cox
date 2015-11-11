angular.module('main_app').controller('LoginCtrl', function($rootScope, $scope, $state, $window, LoginService, UserService) {
    console.log("login controller");

    $scope.login_username_error = false;
    $scope.login_password_error = false;
    $scope.login = function() {
        var user = {
            username: $scope.username,
            password: $scope.password
        }
        if(user.password == '') {
            console.log("password is emtpy",user.password)
        }
        if(user.password == undefined) {
            console.log("password is undefined",user.password)
        }
        $scope.login_username_error = false;
        if(user.username !== undefined && user.password !== undefined) {
            LoginService.login(user).success(function(response) {

                console.log("function response",response);
                $window.sessionStorage.token = response;
                UserService.setCurrentUser(user.username);
                $rootScope.$broadcast('authorized');
                    if ($rootScope.toState) {
                        //console.log("has to State")
                        $state.go($rootScope.toState);
                    } else {
                        //console.log("else")
                        $state.go('main')
                    }
                //$window.sessionStorage.token = response.data.token;
                /*if(response.data.no_such_user) {
                    //console.log("response.data.no_such_user")
                    $scope.login_username_error = true;
                } else if(response.data.invalid_password){
                    //console.log("response.data.invalid_password")
                    $scope.login_password_error = true;
                } else {
                    //console.log("user found")
                    var userInfo;
                    userInfo = {
                        accessToken: response.data.access_token,
                        userName: response.data.userName
                    };
                    $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);

                    $rootScope.$broadcast('authorized');
                    if ($rootScope.toState) {
                        //console.log("has to State")
                        $state.go($rootScope.toState);
                    } else {
                        //console.log("else")
                        $state.go('main')
                    }
                }*/
            }).error(function(status) {
                console.log("erorr status",status)
                alert(status.data)

                // poate aici ar trebui altfel. sa trimiti mesaje specifice din backend si sa afisezi
                // erori specifice. daca doar parola e invalida, sau userul, sau si parola si userul
                // sau poti sa faci cum fac unele siteuri : username or password is invalid si afisezi eroarea asta generica

            })
        } else {
            console.log("invalid credentials")
        }

        console.log("user", user)
        console.log("login clicked")
    }
});