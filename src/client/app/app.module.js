/* global angular, Firebase, console, appConfig */
(function() {
  "use strict";

  angular.module('app', [
      'ngRoute',
      'ui.bootstrap',
      'firebase',
      'app.svc',
      'app.core',
      'app.chat',
      'app.users',
      'app.friends',
      'naif.base64',
      'file-model',
      'ngSanitize'
    ]);

}());
