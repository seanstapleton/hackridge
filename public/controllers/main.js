(function() {
  var app = angular.module('hackridge');

  app.filter('minutesToTime', [function() {
    return function(min) {
      return new Date(2017, 4, 3).setSeconds(min*60);
    }
  }]);

  app.controller('MainController', ['$location', '$scope', '$document', '$window', '$http', function($location, $scope, $document, $window, $http) {
    $scope.mapClickability = false;
    $scope.regData = {};
    $scope.sponsorData = {};
    $scope.reg = false;
    $scope.sp = false;
    $scope.email = false;
    $scope.contactData = {};

    $.getJSON("/data/agenda.json", function(json) {
      $scope.agendas = json;
    });

    $scope.$on('$locationChangeStart', function(event) {
      console.log($location.path());
        if ($location.path() != "/") {
          $('.apply-link').css("display","block");
          $('.home-link').css("display","none");
        }
        else {
          $('.apply-link').css("display","none");
          $('.home-link').css("display","block");
        }
    });

    $scope.mapClick = function() {
      $scope.mapClickability = !$scope.mapClickability;
    }

    $scope.toggleemail = function() {
      $scope.email = !$scope.email;
    }

    $scope.collapse = function(str) {
      $(str).slideToggle();
    }

    $scope.sendEmail = function() {
      $http.post('/backendServices/sendEmail', $scope.contactData)
        .then(function(res) {
          $scope.emailResponse = (res.data.success) ? "Thank you! We'll get back to you soon." : "Whoops. The hamsters must be tired (servers down). Please try emailing us instead at info@hackridge.io!";
        });
    }

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
      if($scope.mapClickability) $scope.mapClickability = false;
      $scope.$apply(function() {
        $scope.scroll = $window.scrollY;
      });
    });
  }]);
}());
