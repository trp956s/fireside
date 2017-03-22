(function() {
  "use strict";

  angular.module('app')
    .config(['$routeProvider', Routes]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'ChatController as vm',
        templateUrl: 'app/chat/chat/chat.html',
        active: 'chat',
        resolve: {
          currentUser: ['FirebaseAuth', function(FirebaseAuth) {
            //  TODO: return user authencation information if available
            return null;
          }]
        }
      })
      .when('/login', {
        templateUrl: 'app/users/login/login.html',
        controller: 'LoginController as vm',
        active: 'login',
      })
      .when('/hashtag/:hash', {
        templateUrl: 'app/chat/chat/chat.html',
        controller: 'ChatController as vm',
        resolve: {
          currentUser: ['FirebaseAuth', function(FirebaseAuth) {
            //  TODO: return user authencation information if available
            return null;
          }]
        }
      })
      .when('/friends/:friend', {
        templateUrl: 'app/chat/chat/chat.html',
        controller: 'ChatController as vm',
        resolve: {
          currentUser: ['FirebaseAuth', function(FirebaseAuth) {
            //  TODO: return user authentication information required
            return null;
          }]
        }
      })
      .when('/friends', {
        templateUrl: 'app/friends/friends/friends.html',
        controller: 'FriendsController as vm',
        resolve: {
          currentUser: ['FirebaseAuth', function(FirebaseAuth) {
            //  TODO: return user authentication information required
            return null;
          }]
        }
      })
      .when('/check', {
        templateUrl: 'app/core/check/check.html',
        controller: 'CheckController as vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

}());
