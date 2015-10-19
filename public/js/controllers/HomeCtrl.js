angular.module('main_app').controller('HomeCtrl', function($scope, $http, ingredients, LoginService, ContentService, toastr) {
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

  var recipesArray = [
        {
            "nume" : "Ciorba Mexicană",
            "timp_preparare" : "42 minute",
            "ingrediente" : ["ingredient 1", "ingredient 2","ingredient 1", "ingredient 2",
                            "ingredient 1", "ingredient 2","ingredient 1", "ingredient 2"],
            "number_likes" : "pie",
            "accuracy" : "80",
            "ingrediente_corecte" : "2/4 ingrediente",
            "image_link":"images/image1.jpg"
        },
        {
            "nume" : "Colţunaşi la cuptor",
            "timp_preparare" : "23 minute",
            "ingrediente" : ["ingredient 1", "ingredient 2","ingredient 1", "ingredient 2",
                            "ingredient 1", "ingredient 2","ingredient 1", "ingredient 2"],
            "number_likes" : "pie",
            "accuracy" : "90",
            "ingrediente_corecte" : "3/4 ingrediente",
            "image_link":"images/image2.jpg"
        },
        {
            "nume" : "Friptură de vită",
            "timp_preparare" : "12 minute",
            "ingrediente" : ["ingredient 1", "ingredient 2","ingredient 1", "ingredient 2",
                            "ingredient 1", "ingredient 2","ingredient 1", "ingredient 2"],
            "number_likes" : "pie",
            "accuracy" : "90",
            "ingrediente_corecte" : "3/4 ingrediente",
            "image_link":"images/image3.jpg"
        },
        {
            "nume" : "Friptură de vită",
            "timp_preparare" : "12 minute",
            "ingrediente" : ["ingredient 1", "ingredient 2","ingredient 1", "ingredient 2",
                            "ingredient 1", "ingredient 2","ingredient 1", "ingredient 2"],
            "number_likes" : "pie",
            "accuracy" : "90",
            "ingrediente_corecte" : "3/4 ingrediente",
            "image_link":"images/image3.jpg"
        },
        {
            "nume" : "Friptură de vită",
            "timp_preparare" : "12 minute",
            "ingrediente" : ["ingredient 1", "ingredient 2","ingredient 1", "ingredient 2",
                            "ingredient 1", "ingredient 2","ingredient 1", "ingredient 2"],
            "number_likes" : "pie",
            "accuracy" : "90",
            "ingrediente_corecte" : "3/4 ingrediente",
            "image_link":"images/image3.jpg"
        },
        {
            "nume" : "Friptură de vită",
            "timp_preparare" : "12 minute",
            "ingrediente" : ["ingredient 1", "ingredient 2","ingredient 1", "ingredient 2",
                            "ingredient 1", "ingredient 2","ingredient 1", "ingredient 2"],
            "number_likes" : "pie",
            "accuracy" : "90",
            "ingrediente_corecte" : "3/4 ingrediente",
            "image_link":"images/image3.jpg"
        },
  ]

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
            /*
            THIS HAS BEEN COMENTED FOR TESTING PURPOSES
            if(data.length > 0){
                $scope.recipes = data;
            } else {
                toastr.error("No recipes found");
                $scope.recipes = data;
            }
            */
            $scope.recipes = recipesArray;
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

    $scope.isAuthenticated = function() {
        //console.log("NavbarCtrl isAuthenticated",LoginService.isAuthenticated())
        return LoginService.isAuthenticated();
    };


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