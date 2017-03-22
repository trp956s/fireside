/* global angular, Firebase, console, appConfig */
(function() {
  "use strict";

  angular.module('app')
    .controller('mainController', ['$route', '$location', '$anchorScroll', 'FirebaseAuth', '$scope', MainController]);

  function MainController($route, $location, $anchorScroll, FirebaseAuth, $scope) {

    var app = this;

    // Collection of dynamic Script URLs to be loaded
    app.scripts = [];

    app.$route = $route;

    app.scrollTo = function(hash) {
      $location.hash(hash);
      $anchorScroll();
    };

    app.nav = {
      mobileIsOpen: false,
      links: [{
        route: '#/',
        title: 'Chat',
        active: 'chat',
        order: 1,
        auth: 'public'
      },
      {
        route: '#/friends',
        title: 'Friends',
        active: 'friends',
        order: 2,
        auth: true
      },
      {
      route: '#/login',
      title: 'Login',
      active: 'login',
      order: 3,
      auth: false
    }],
    };

    app.closeNav = function() {
      app.nav.mobileIsOpen = false;
    };

    app.today = new Date();

    app.toggleMenu = function(isOpen) {
      app.nav.mobileIsOpen = isOpen ? false : true;
    };

    app.user = FirebaseAuth.$getAuth();

    // To handle login/logout
    FirebaseAuth.$onAuthStateChanged(function(user) {
      app.user = user;
      $scope.$apply();
    });

    app.logout = function() {
      FirebaseAuth.logout();
      app.nav.mobileIsOpen = false;
    };

  }

}());
