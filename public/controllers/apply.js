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
    $scope.checkPage = function(p) {
      var page;
      if (p) page = "#app-page-" + (p-1);
      else page = "#app-page-" + $scope.page;
      var reqs =  page + " .required";
      var count = 0;
      $(reqs).each(function(idx) {
        var self = $(this);
        if (!self.val() || self.val().length < 1) {
          self.css("border", "2px solid #E16C5E");
          count++;
        } else if (self.prop("type") == "checkbox") {
          if (!self.is(":checked")) {
            self.parent().css("border", "2px solid #E16C5E");
            count++;
          } else {
            self.parent().css("border", "none");
          }
        } else self.css("border", "none");
      });
      if ($(page).find("input[type=radio]").length > 0 && !$(page).find("input[type=radio]").is(':checked')) count++;
      if (count > 0) return false;
      else return true;
    }

    $scope.sendApplication = function() {
      var msgs = [];
      var pages = ["Basic Information", "Team Information", "Logistics", "Confirmations"];
      for (var i = 0; i < 4; i++) {
        console.log("round: ", i);
        if (!$scope.checkPage(i+1)) {
          msgs.push("Please complete the " + pages[i] + " page.");
          $scope.appWarnings = msgs;
        }
      }
      if ($scope.appWarnings) return;
      var formData = $scope.applicationData;
      $http.post('/backendServices/registerApplicant', formData);
    }
  }]);
}());
