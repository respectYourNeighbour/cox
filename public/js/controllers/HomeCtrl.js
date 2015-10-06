angular.module('main_app').controller('HomeCtrl', function($scope, $http, ingredients, ContentService, toastr) {
      $scope.tags = [
    { text: 'Tag1' },
    { text: 'Tag2' },
    { text: 'Tag3' }
  ];
  var loadTags = [];
  console.log("loadTags1",loadTags)
  console.log("ingredients",ingredients)
  for (var i = 0; i < ingredients.data.length; i++) {
      //console.log("data[]",ingredients.data[i])
      loadTags[i] = {"text" : ingredients.data[i].nume}
  };
  console.log("loadTags",loadTags)

  /*var loadTags = [{ "text": "Tag1" },

                    { "text": "Tag2" },

                    { "text": "Tag3" },

                    { "text": "Tag4" },

                    { "text": "Tag5" },

                    { "text": "Tag6" },

                    { "text": "Tag7" },

                    { "text": "Tag8" },

                    { "text": "Tag9" },

                      { "text": "Tag10" }];*/

    $scope.loadTags = function() {

        return loadTags;

    };

    $scope.showMore = function() {
        console.log("showMore clicked")
    }

    $scope.searchRecipes = function() {
        console.log("searchRecipes clicked")
        var tagsString = $scope.tags.map(function(tag) {
            console.log("tag",tag)
            return tag.text;
        })
        ContentService.getRecipes(tagsString).success(function(data){
            console.log("success data",data);
            if(data.length > 0){
                $scope.recipes = data;
            } else {
                toastr.error("No recipes found");
                $scope.recipes = data;
            }
            /*


                AICI AR TREBUI CA DESCRIEREA FIECAREI RETETE SA FIE LIMITATA LA 100 CARACTERE. DACA E PESTE 100 CARACTERE,
                SA APARA SHOW MORE. CAND DAI CLICK PE SHOW MORE SA TE DUCA PE PAGINA CU RETETA SAU SA ITI AFISEZE INTREAGA DESCRIERE
                http://viralpatel.net/blogs/dynamically-shortened-text-show-more-link-jquery/

            */
        }).error(function(data){
            console.log("err data",data)
        });
        console.log("tagsString",tagsString)
    }


    /*$http.jsonp('https://api.github.com/repos/sahat/satellizer?callback=JSON_CALLBACK')
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
        });*/
});