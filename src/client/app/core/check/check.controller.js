(function() {
  "use strict";

  angular.module('app.core')
  .controller('CheckController', ['FirebaseRef', '$firebaseArray', CheckController]);

  function CheckController(FirebaseRef, $firebaseArray) {

    var vm = this;
    
    // Load Friends
    vm.check = $firebaseArray(FirebaseRef.db.child('check'));
  }

}());
