(function() {
  "use strict";

  angular.module('app')
    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.hashPrefix('');
    }]);

}());
