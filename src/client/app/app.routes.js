(function () {
  "use strict";

  angular.module('app')
    .config(['$routeProvider', Routes]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/check', {
        templateUrl: 'app/core/check.html',
        controller: 'CheckController as vm'
      })
      .when('/', {
        controller: 'ChatController as vm',
        templateUrl: 'app/chat/chat.html',
        active: 'chat',
        resolve: {
          currentUser: ['FirebaseAuth', function (FirebaseAuth) {
            return FirebaseAuth.$waitForSignIn();
          }]
        }
      })
      .when('/hashtag/:hash', {
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatController as vm',
        resolve: {
          currentUser: ['FirebaseAuth', function (FirebaseAuth) {
            return FirebaseAuth.$waitForSignIn();
          }]
        }
      })
      .when('/login', {
        templateUrl: 'app/users/login.html',
        controller: 'LoginController as vm',
        active: 'login',
      })
      .when('/friends', {
        templateUrl: 'app/friends/friends.html',
        controller: 'FriendsController as vm',
        resolve: {
          currentUser: ['FirebaseAuth', function (FirebaseAuth) {
            return FirebaseAuth.$requireSignIn();
          }]
        }
      })
      .when('/friends/:friend', {
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatController as vm',
        resolve: {
          currentUser: ['FirebaseAuth', function (FirebaseAuth) {
            return FirebaseAuth.$requireSignIn();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }

}());
