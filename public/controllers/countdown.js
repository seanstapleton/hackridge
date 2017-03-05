(function() {
    var app = angular.module('hackridge');
    app.controller('CountdownController', ['$scope','$interval', function($scope, $interval) {
        $interval(function() {
            $scope.countdown = countdown(new Date("Mar 5 2017 12:00:00"));
        }, 1000,0);

    }]);
}());
