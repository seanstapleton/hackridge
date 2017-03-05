(function() {
  var app = angular.module('hackridge', ['ngRoute', 'ngAnimate', 'duScroll']);
  app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/landing.html'
      })
      .when('/apply', {
        templateUrl: '/views/apply.html'
      })
      .when('/countdown', {
        templateUrl: '/views/countdown.html'
      })
      .otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
  }]);

  app.directive('elpos', function($window) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var page = angular.element(window);
        page.bind('scroll', function() {
          var scrollTop = element[0].getBoundingClientRect().top;
          var scrollBottom = $window.innerHeight - element[0].getBoundingClientRect().bottom;
          scope.$apply(function() {
            scope[attrs.id] = {top: scrollTop, bottom: scrollBottom};
          });
        });
      }
    }
  });

}());
