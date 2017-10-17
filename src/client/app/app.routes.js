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
        // TODO - Add a resolve that provides an optional currentUser object [AUTH-7]
        resolve: {
          currentUser: ['FirebaseAuth', function(FirebaseAuth) {
            //  TODO: return user authencation information if available
            return {};
          }]
        }
      })
      .when('/hashtag/:hash', {
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatController as vm',
        // TODO - Add a resolve that provides an optional currentUser object [AUTH-7]
        resolve: {
          currentUser: ['FirebaseAuth', function(FirebaseAuth) {
            //  TODO: return user authencation information if available
            return {};
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
        // TODO - Add a resolve that requires authentication and provides a currentUser object [AUTH-8]
        resolve: {
          currentUser: ['FirebaseAuth', function(FirebaseAuth) {
            //  TODO: return user authencation information if available
            return {};
          }]
        }
      })
      .when('/friends/:friend', {
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatController as vm',
        // TODO - Add a resolve that requires authentication and provides a currentUser object [AUTH-8]
        resolve: {
          currentUser: ['FirebaseAuth', function(FirebaseAuth) {
            //  TODO: return user authencation information if available
            return {};
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }

}());
