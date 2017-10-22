(function () {
  "use strict";

  /**
   * This service manages user profiles including lookup by user ID and 
   * creating new profiles from an auth record.
   * @requires FirebaseRef for the Firebase database reference
   * @requires $firebaseObject to return results from Firebase as an object
   */
  angular.module('app.svc')
    .service('Profile', ['FirebaseRef', '$firebaseObject', ProfileService]);

  function ProfileService(FirebaseRef, $firebaseObject) {

    /**
     * get user info
     * @param {String} uid - user ID
     * @returns {Promise<FirebaseObject>} - user info
     */
    function getProfileById(uid) {
      let ref = FirebaseRef.db.child('/users/').child(uid).child('profile');
      return $firebaseObject(ref);
    }

    /**
     * Store the UserProfile into Firebase.
     * @param userProfile app.UserProfile
     * @param provider the latest authentication provider
     * @return Promise
     */
    function saveProfile(userProfile, provider) {
      var updates = {};
      updates[`/profiles/${userProfile.uid}`] = userProfile;
      updates[`/users/${userProfile.uid}/profile`] = userProfile;
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
