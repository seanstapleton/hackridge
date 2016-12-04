(function() {
  var app = angular.module('hackridge', ['ngRoute']);
  app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/landing.html',
        controller: 'LandingController'
      })
      .otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
  }]);

  app.controller('LandingController', ['$scope', '$http', function($scope, $http) {
    $scope.check = "Yo";
  }]);
}());
