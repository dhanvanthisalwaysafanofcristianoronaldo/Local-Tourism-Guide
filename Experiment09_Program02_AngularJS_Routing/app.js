/* Experiment 09 / Program 02 — ngRoute single-page site. */
(function () {
  "use strict";
  var app = angular.module("routeSiteApp", ["ngRoute"]);
  app.config(["$routeProvider", function ($routeProvider) {
    // Each route loads a local partial into the single ng-view outlet.
    $routeProvider.when("/main", { templateUrl: "views/main.html", controller: "MainController", controllerAs: "vm" })
      .when("/red", { templateUrl: "views/red.html", controller: "RedController", controllerAs: "vm" })
      .when("/green", { templateUrl: "views/green.html" })
      .when("/blue", { templateUrl: "views/blue.html", controller: "BlueController", controllerAs: "vm" })
      .otherwise({ redirectTo: "/main" });
  }]);
  // Make current route available for active navigation styling.
  app.run(["$rootScope", "$location", function ($rootScope, $location) { $rootScope.$location = $location; }]);
  app.controller("MainController", function () { this.sent = false; this.send = function (form) { if (form.$valid) { this.sent = true; } }; });
  app.controller("RedController", function () { this.sent = false; this.send = function (form) { if (form.$valid) { this.sent = true; } }; });
  app.controller("BlueController", function () { this.sent = false; this.send = function (form) { if (form.$valid) { this.sent = true; } }; });
}());
