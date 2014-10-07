'use strict';

/* Controllers */

var myAngularApp = angular.module('myAngularApp', []);

myAngularApp.controller('myListCtrl', function($scope) {
  $scope.phones = [
    {'name': 'Spider-Man',
     'snippet': 'Fast and it has the ability to create spider-webs.'},
    {'name': 'Storm',
     'snippet': 'Has the ability to start weather storms.'},
    {'name': 'Profesor-X™',
     'snippet': 'Super chill cool guy.'}
  ];
});