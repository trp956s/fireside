(function () {
  "use strict";

  /**
   * This is where Routes to the various Controllers are managed. To restrict access
   * to individual routes, or to provide user data in advance of the Controller being
   * created, a resolve object will need to be added to each route.
   */
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
          currentUser: ['FirebaseAuth', function(FirebaseAuth) {
            return FirebaseAuth.$waitForSignIn();
          }]
        }
      })
      .when('/hashtag/:hash', {
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatController as vm',
        resolve: {
          currentUser: ['FirebaseAuth', function(FirebaseAuth) {
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
          currentUser: ['FirebaseAuth', function(FirebaseAuth) {
            console.log('current user');
            let req = FirebaseAuth.$requireSignIn();
            return req;
          }]
        }
      })
      .when('/friends/:friend', {
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatController as vm',
        resolve: {
          currentUser: ['FirebaseAuth', function(FirebaseAuth) {
            console.log('current user');
            let req = FirebaseAuth.$requireSignIn();
            return req;
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }

}());
