angular.module('main_app').controller('HomeCtrl', function($scope, $http) {
      $scope.tags = [
    { text: 'Tag1' },
    { text: 'Tag2' },
    { text: 'Tag3' }
  ];


  var loadTags = [{ "text": "Tag1" },

                    { "text": "Tag2" },

                    { "text": "Tag3" },

                    { "text": "Tag4" },

                    { "text": "Tag5" },

                    { "text": "Tag6" },

                    { "text": "Tag7" },

                    { "text": "Tag8" },

                    { "text": "Tag9" },

                      { "text": "Tag10" }];

    $scope.loadTags = function() {

        return loadTags;

    };


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