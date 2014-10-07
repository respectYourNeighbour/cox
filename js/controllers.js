'use strict';

/* Controllers */

var myAngularApp = angular.module('myAngularApp', []);

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
  $scope.name = 'user';
  $scope.orderProperty = 'age';
});