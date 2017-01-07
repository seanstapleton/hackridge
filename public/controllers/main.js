(function() {
  var app = angular.module('hackridge');
  app.controller('MainController', ['$scope', '$document', '$window', function($scope, $document, $window) {
    $scope.mapClickability = false;
    $scope.regData = {};
    $scope.sponsorData = {};
    $scope.reg = false;
    $scope.sp = false;

    $scope.mapClick = function() {
      $scope.mapClickability = !$scope.mapClickability;
    }

    $scope.collapse = function(str) {
      $(str).slideToggle();
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
