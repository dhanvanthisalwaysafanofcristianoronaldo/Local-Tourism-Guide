// Create the AngularJS application module.
var helloApp = angular.module('helloApp', []);

// Controller contains the presentation logic for this view.
helloApp.controller('HelloWorldCtrl', function ($scope) {
  // $scope connects the controller (model data) to the HTML view.
  $scope.message = 'Hello World';
});
