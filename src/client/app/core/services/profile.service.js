(function() {
  "use strict";

  angular.module('app.core')
    .service('ProfileSvc', ['FirebaseRef', '$firebaseObject', ProfileService]);

  function ProfileService(FirebaseRef, $firebaseObject) {

    return {
      getProfileByID: getProfileByID,
    };

    /**
     * get user info
     * @param {String} id - user ID
     * @returns {Promise<FirebaseObject>} - user info
     */
    function getProfileByID ( id ) {

      // TODO: return firebase object of user profile

    } // end getProfileByID()

  }

}());
