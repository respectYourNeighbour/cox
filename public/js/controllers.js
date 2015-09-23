'use strict';

/* Controllers */

var myAngularApp = angular.module('myAngularApp', []);

// +++++++++++++++++++++++++++++++++++++++
// 'Data' without a $http request;       +
// You don't need a web-server for this; +
// +++++++++++++++++++++++++++++++++++++++
/*
myAngularApp.controller('myListCtrl', function($scope) {
  $scope.heroes = [
    {'name': 'Spider-Man',
     'snippet': 'Fast and it has the ability to create spider-webs.',
     'age':'21'},
    {'name': 'Storm',
     'snippet': 'Has the ability to start weather storms.',
 	 'age':'32'},
    {'name': 'Profesor-X™',
     'snippet': 'Super chill cool guy.',
     'age':'43'}
  ];
*/


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 'Data' fetched with a $http request;                    +
//  You need a web-server for this up and running;         +
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
myAngularApp.controller('myListCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('resources/lista.json' , {cache:true}).success(function(data) {
		$scope.heroes = data;
	});

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


    /*$( ".menu-icon" ).click(function() {
      $( this ).toggleClass( "effect1" );
    });*/

	$scope.name = 'user';
	$scope.orderProperty = 'age';
}]);
