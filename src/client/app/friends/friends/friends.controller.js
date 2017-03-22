(function() {
    "use strict";

    angular.module('app.friends')
        .controller('FriendsController', ['FirebaseRef', '$firebaseArray', 'currentUser', 'ProfileSvc', FriendsController]);

    function FriendsController(FirebaseRef, $firebaseArray, currentUser, ProfileSvc) {

      var vm = this;

      // Get the current user's information
      currentUser.profile = ProfileSvc.getProfileByID(currentUser.uid);

      // config
      vm.searchResults = [];
      vm.searched = false;

      // Load Friends
      vm.friends = $firebaseArray(FirebaseRef.db.child('users').child(currentUser.uid).child('chats'));

      // Get Friends Profiles
      vm.friends.$watch(function (event) {
        angular.forEach(vm.friends, function (friend) {
          friend.profile = ProfileSvc.getProfileByID(friend.$id);
        });
      });

      /**
       * Search for friends
       * @param email
       */
      vm.searchUsers = function (email) {
        vm.searched = true;
        vm.searchResults = $firebaseArray(FirebaseRef.db.child('profiles').orderByChild('email').equalTo(email));
      };

  }

}());
