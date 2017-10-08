(function () {
  "use strict";

  angular.module('app.svc')

    .service('FirebaseAuth', ['Profile', '$firebaseAuth', FirebaseAuthService]);

  function FirebaseAuthService(Profile, $firebaseAuth) {

    /**
     * Authenticate a user with the specified credentials.
     * @param credentials app.Credentials
     * @return Promise
     */
    function authenticate(credentials) {
      // TODO - Login using Google OAuth, making sure to return the Promise [AUTH-1]
      return $firebaseAuth()
        .$signInWithPopup("google")
        .then(processUserCredential);
      // TODO - Call processUserCredential upon successful login, returning the Promise [AUTH-2]
    }

    /**
     * Performs a Firebase logout and returns a promise.
     * @return Promise
     */
    function logout() {
      // TODO - Logout, making sure to return the Promise [AUTH-3]
      return $firebaseAuth().$signOut();
    }


    // ==================================================================== //
    // ========== DO NOT NEED TO MODIFY ANYTHING BELOW THIS LINE ========== //
    // ==================================================================== //


    /**
     * Returns the service object which extends the $firebaseAuth object for convenience.
     */
    return angular.merge($firebaseAuth(), {
      authenticate: authenticate,
      logout: logout
    });

    /**
     * Performs the necessary tasks on the firebase.UserCredential object
     * returned by Firebase and returns a clean UserAuth object.
     * @private
     * @param userCredential firebase.UserCredential
     * @return app.UserAuth
     */
    function processUserCredential(userCredential) {
      var userProfile = {
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
      };

      Profile.store(userProfile, userCredential.credential.provider);

      // Return User Auth object as the result of this
      return {
        token: userCredential.credential.accessToken,
        profile: userProfile,
        provider: userCredential.credential.provider,
        uid: userProfile.uid
      };
    }

  }

}());
