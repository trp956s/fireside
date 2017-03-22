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

      // TODO: Load Friends from database here
      vm.friends = [];

      // TODO: call getFriendsProfiles() when ever the friends list changes.

      /**
       * Search for friends
       * @param email
       */
      vm.searchUsers = function (email) {
        vm.searched = true;
        // TODO: Populate results from firebase query inside of vm.searchResults
        vm.searchResults = [];
      };


      function getFriendsProfiles () {
        angular.forEach(vm.friends, function (friend) {
          friend.profile = ProfileSvc.getProfileByID(friend.$id);
        });
      }

  }

}());
