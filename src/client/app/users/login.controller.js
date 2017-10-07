(function () {
  "use strict";

  angular.module('app.users')
    .controller('LoginController', ['$routeParams', 'FirebaseAuth', '$location', LoginController]);

  function LoginController($routeParams, FirebaseAuth, $location) {

    var vm = this;
    vm.error = false;
    
    // No user is signed in.
    vm.authenticate = function () {
      vm.error = false;
      FirebaseAuth.authenticate({ provider: 'google' })
        .then(function (userAuth) {
          $location.url('/');
        }, function (reason) {
          vm.error = reason;
        });
    };

  }

}());
