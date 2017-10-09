(function () {
  "use strict";

  angular.module('app.svc')
    .service('Profile', ['FirebaseRef', '$firebaseObject', ProfileService]);

  function ProfileService(FirebaseRef, $firebaseObject) {

    /**
     * get user info
     * @param {String} uid - user ID
     * @returns {Promise<FirebaseObject>} - user info
     */
    function getProfileById(uid) {
      // TODO - Return user profile [AUTH-4]
      return $firebaseObject(FirebaseRef.db.child('users').child(uid).child('profile'));
    }

    /**
     * Store the UserProfile into Firebase.
     * @param userProfile app.UserProfile
     * @param provider the latest authentication provider
     * @return Promise
     */
    function saveProfile(userProfile, provider) {
      var updates = {};
      // TODO - Update the global profile with the new profile data (under /profiles) [AUTH-5]
      updates['/profiles'] = userProfile;
      updates['/users/' + userProfile.uid + '/profile'] = userProfile;
      // TODO - Update the user profile with the new profile data (under /users/{userId}/profile) [AUTH-5]
      return FirebaseRef.db.update(updates);
    }


    // ==================================================================== //
    // ========== DO NOT NEED TO MODIFY ANYTHING BELOW THIS LINE ========== //
    // ==================================================================== //


    return {
      getById: getProfileById,
      store: saveProfile,
    };

  }

}());
