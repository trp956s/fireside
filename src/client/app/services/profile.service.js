(function() {
  "use strict";

  angular.module('app.svc')
    .service('Profile', ['FirebaseRef', '$firebaseObject', ProfileService]);

  function ProfileService(FirebaseRef, $firebaseObject) {

    return {
      getById: getProfileById,
      store: saveProfile,
    };

    /**
     * get user info
     * @param {String} id - user ID
     * @returns {Promise<FirebaseObject>} - user info
     */
    function getProfileById ( id ) {

      // create Firebase object with user data
      return $firebaseObject(FirebaseRef.db.child('users').child(id).child('profile'));

    }

    /**
     * Store the UserProfile into Firebase.
     * @param userProfile app.UserProfile
     * @param provider the latest authentication provider
     * @return Promise
     */
    function saveProfile(userProfile, provider) {
      // Create a Profile starting with the User
      var profile = angular.copy(userProfile);

      // Replace the current Profile with the new Profile
      // Replace profile in profiles
      var updates = {};
      updates['/users/' + profile.uid + '/profile'] = profile;
      updates['/profiles/' + profile.uid] = profile;
      return FirebaseRef.db.update(updates);
    }

  }

}());
