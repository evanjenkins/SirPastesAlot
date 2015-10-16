'use strict';

sirPastesAlot.controller('sirOptions', ['$scope', 'sirServices', function ($scope, sirServices) {

  $scope.getBins = function () {
    $scope.editing = -1;
    $scope.addNew = false;
    $scope.newBin = {};

    sirServices.getBins().then(function (pasteBins) {
      if (pasteBins.length <= 0) {
        $scope.pasteBins = [];
      } else {
        $scope.pasteBins = pasteBins;
      }
    });
  };

  $scope.addPasteBin = function (newBin) {
    console.log($scope.editing);
    if ($scope.editing >= 0) {
      sirServices.cutBin($scope.editing).then(function (pasteBins) {
        //$scope.pasteBins = pasteBins;
        sirServices.addBin(newBin).then(function (bins) {
          $scope.pasteBins = bins;
          $scope.editing = -1;
          $scope.newBin = {};
          $scope.addNew = !$scope.addNew;
        });
      });
    } else {
      var addBin = angular.copy(newBin);
      sirServices.addBin(addBin).then(function (bins) {
        $scope.pasteBins = bins;
        $scope.newBin = {};
        $scope.addNew = !$scope.addNew;
      });
    }
  };

  $scope.editBin = function (bin, key) {
    $scope.newBin = bin;
    $scope.addNew = !$scope.addNew;
    $scope.editing = key;
  };

  $scope.deleteBin = function (key) {
    sirServices.cutBin(key).then(function (pasteBins) {
      $scope.pasteBins = pasteBins;
    });
  };

  $scope.cancelEdit = function () {
    $scope.addNew = !$scope.addNew;
    $scope.newBin = {};
    $scope.editing = -1;
  };

  $scope.pasteBin = function (bin) {
    sirServices.pasteBin(bin).then(function () {
      console.log("You just got pasted!");
    }, function (err) {
      console.log(err);
    });
  };
}]);
//# sourceMappingURL=sirOptions.js.map
