angular.module('main_app').controller('HomeCtrl', function($scope, $rootScope, $http, ingredients, LoginService, ContentService, toastr, recipes) {
    $scope.tags = [{
        text: 'Tag1'
    }, {
        text: 'Tag2'
    }, {
        text: 'Tag3'
    }];
    var loadTags = [];
    console.log("loadTags1", loadTags)
    console.log("ingredients", ingredients)
    console.log("recipes", recipes)
    for (var i = 0; i < ingredients.data.length; i++) {
        //console.log("data[]",ingredients.data[i])
        loadTags[i] = {
            "text": ingredients.data[i].nume
        }
    };
    console.log("loadTags", loadTags)
    $scope.myVar = "111";
    $scope.tester = true;

    console.log("$scope.myVar", $scope.myVar)

    $scope.ingredientPopover = {
        templateUrl: 'myPopoverTemplate.html',
    };

    $scope.value = 1;
    $scope.incrementValue = function() {
        console.log("increment")
        $scope.value += 1;
    }

    $scope.rate = 0;
    $scope.maxStars = 3;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    var recipesArray = recipes.data;

    $rootScope.limit = 3;
    $scope.loadTags = function() {

        return loadTags;

    };

    var person = {
        firstName: "Ajay",
        lastName: "Sattikar",
        imageSrc: "http://odetocode.com/Images/scott_allen_2.jpg"
    };

    $scope.text = "Hello Angular!";
    $scope.person = person;


    $scope.showMore = function() {
        console.log("showMore clicked")
    }
    $scope.recipes = recipesArray; // THIS LINE IS HERE FOR TESTING PURPOSES ONLY SO I DONT HAVE TO PRESS SEARCH EACH TIME
    console.log("$scope.recipes", $scope.recipes)
    $scope.searchRecipes = function() {
        console.log("searchRecipes clicked")
        $(".searchBox").animate({
            "margin-top": "0",
        }, 1000, function() {
            // Animation complete.
            var tagsString = $scope.tags.map(function(tag) {
                console.log("tag", tag)
                return tag.text;
            })
            ContentService.getRecipes(tagsString).success(function(data) {
                console.log("success data", data);
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
            }).error(function(data) {
                console.log("err data", data)
            });
            console.log("tagsString", tagsString)
        });


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