'use strict';

var sirPastesAlot = angular.module('sirPastesAlot', []);

sirPastesAlot.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
  // Allow same origin resource loads.
  'self',
  // Allow loading from our assets domain.  Notice the difference between * and **.
  'chrome-extension://**']);
}]);

sirPastesAlot.constant('appMeta', {
  version: '0.0.1'
});
//# sourceMappingURL=sirPastesAlot.js.map
