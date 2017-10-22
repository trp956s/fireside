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
      return $firebaseArray(FirebaseRef.db.child('profiles').orderByChild('email').equalTo(email));
    }

    /**
     * List all friends with whom we have previously chatted.
     * @param uid the user ID
     * @return list of users with profiles
     */
    function listFriends(uid) {
      var list = $firebaseArray(FirebaseRef.db.child(`/users/${uid}/chats/`));

      list.$watch(() => {
        angular.forEach(list, friend => {
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
