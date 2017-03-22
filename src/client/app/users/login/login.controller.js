(function() {
  "use strict";

  angular.module('app.users')
    .controller('LoginController', ['$routeParams', 'FirebaseAuth', '$location', LoginController]);

  function LoginController($routeParams, FirebaseAuth, $location) {

    var vm = this;

    var path = $location.path();

    vm.clearMessages = function() {
      vm.error = false;
    };

    // Check for authentication

    // No user is signed in.
    vm.authenticate = function() {
      vm.clearMessages();
      FirebaseAuth.authenticate({
        provider: 'google',
        email: vm.email,
        password: vm.password
      }).then(function(userAuth) {
          $location.url('/');
      }, function(reason) {
        vm.error = reason;
      });
    };

  }

}());
