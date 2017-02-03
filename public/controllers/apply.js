(function() {
  var app = angular.module('hackridge');
  app.controller('ApplyController', ['$scope', '$document', '$window', '$http', function($scope, $document, $window, $http) {
    $scope.page = 0;
    $scope.filled = true;

    $scope.incPage = function() {
      console.log($scope.checkPage());
      if (!$scope.checkPage()) { $scope.filled = false; return; }
      $scope.page = ($scope.page + 1) % 4;
      $('#appCarousel').carousel("next");
      $scope.filled = true;
    }
    $scope.decPage = function() {
      if (!$scope.checkPage()) { $scope.filled = false; return; }
      $scope.page = ($scope.page + 3) % 4;
      $('#appCarousel').carousel("prev");
      $scope.filled = true;
    }
    $scope.checkPage = function() {
      var page = "#app-page-" + $scope.page + " .required";
      var count = 0;
      $(page).each(function(idx) {
        if ($(this).val().length < 1) {
          $(this).css("border", "2px solid #E16C5E");
          count++;
        }
      });
      if (count > 0) return false;
      else return true;
    }

    $scope.sendApplication = function() {
      var formData = $scope.applicationData;
      $http.post('/backendServices/registerApplicant', formData);
    }
  }]);
}());
