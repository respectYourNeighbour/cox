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