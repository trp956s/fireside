(function () {
  "use strict";

  /**
   * This service searches for user profiles and also lists existing friends.
   * @requires Profile to lookup user profiles
   * @requires FirebaseRef for the Firebase database reference
   * @requires $firebaseArray to return results from Firebase as an array
   */
  angular.module('app.svc')
    .service('Friends', ['Profile', 'FirebaseRef', '$firebaseArray', FriendsService]);

  function FriendsService(Profile, FirebaseRef, $firebaseArray) {

    /**
     * Search for new friends based upon their email address
     * @param email the email address to match
     * @return list of user profiles
     */
    function searchFriends(email) {
      // TODO - Return a list of user profiles matching the given email address [PVT-1]
      return $firebaseArray(FirebaseRef.db.child('profiles').orderByChild('email').equalTo(email));
    }

    /**
     * List all friends with whom we have previously chatted.
     * @param uid the user ID
     * @return list of users with profiles
     */
    function listFriends(uid) {
      // TODO - Assign the 'list' variable to a list of chat friend user IDs (from /users/{userId}/chats) [PVT-4]
      var list = $firebaseArray(FirebaseRef.db.child('users').child(uid).child('chats'));

      // TODO - watch for changes to the list and add a .profile element to each object, 
      // using the Profile service to look up the profile for each ID [PVT-5]
      list.$watch(function () {
        angular.forEach(list, function (friend) {
          friend.profile = Profile.getById(friend.$id);
        });
      });

      return list;
    }


    // ==================================================================== //
    // ========== DO NOT NEED TO MODIFY ANYTHING BELOW THIS LINE ========== //
    // ==================================================================== //


    return {
      list: listFriends,
      search: searchFriends,
    };

  }

}());
