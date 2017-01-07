(function() {
  var app = angular.module('hackridge', ['ngRoute', 'duScroll']);
  app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/landing.html'
      })
      .otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
  }]);

  app.controller('MainController', ['$scope', '$document', '$window', function($scope, $document, $window) {
    $scope.regData = {};
    $scope.sponsorData = {};
    $scope.reg = false;
    $scope.sp = false;

    $scope.rtog = function() {
      $scope.reg = !$scope.reg;
    }
    $scope.stog = function() {
      $scope.sp = !$scope.sp;
    }

    $scope.untog = function() {
      if ($scope.reg) $scope.reg = false;
      else $scope.sp = false;
    }

    $scope.register = function() {
      $http.post('/backendServices/register', $scope.regData)
        .then(function(res) {
          if (res.data.err) console.log(res.data.err);
          $scope.regMessage = (res.data.success) ? "Success! We'll send you some more information about our awesome event later!" : "Sorry, our hamsters are off duty (servers down). Please email info@hackridge.io instead.";
        });
    }

    $scope.st = function(id) {
      var offset = 0;
      var duration = 1500;
      var element = angular.element(document.getElementById(id));
      $document.scrollToElementAnimated(element, offset, duration);
    }
    $scope.sTop = function() {
      var offset = 0;
      var duration = 1500;
      $document.scrollTopAnimated(offset, duration);
    }
    $document.on('scroll', function() {
      $scope.$apply(function() {
        $scope.scroll = $window.scrollY;
      });
    });
  }]);

  app.controller('FAQController', ['$scope', function($scope) {
      $scope.data = [
          {
              "question":"What is Hack//Ridge?",
              "answer":"Hack//Ridge is a high school-level hackathon hosted by Maine South HS's Computer Science Club. Join 100-150 other high school hackers for 24 hours of creative programming."
          },
          {
              "question":"What if I don't have a team or an idea?",
              "answer":"No problem! We'll help you find a team to join once you're here. And, if you're really dry for awesome ideas, you can check out our list of curated brainstormed projects made by our planning committee."
          },
          {
              "question":"Who can attend?",
              "answer":"As long as you're a high school student, you're welcome to come! Just make sure you bring your student ID to be admitted."
          },
          {
              "question":"What can I build?",
              "answer":"Anything! We've seen games, websites, and hardware. However, we encourage you take on a project that's 'outside-the-box'."
          },
          {
              "question":"How much does it cost?",
              "answer":"Absolutely nothing! There's no admittence fee, and we'll provide snacks and food for you. "
          },
          {
              "question":"How big can teams be?",
              "answer":"You can signup as a team of up to 5. But, if you don't have a team before the event, don't worry. We'll help you with that."
          },
          {
              "question":"What should I bring?",
              "answer":"A high school student ID, a laptop, and chargers is all you really need. However, we recommend you bring extra clothes, toiletries, and a sleeping bag as well! For past attendees, we will not be allowing tents this year."
          },
          {
              "question":"Can I reuse a previous project?",
              "answer":"Haha, NO! You cannot use anything that you've started working on before the event. You need to scratch. However, Open Source code is free game. "
          }
      ];
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
