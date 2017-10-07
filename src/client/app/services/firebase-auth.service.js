(function () {
  "use strict";

  angular.module('app.svc')

    .service('FirebaseAuth', ['Profile', '$firebaseAuth', FirebaseAuthService]);

  function FirebaseAuthService(Profile, $firebaseAuth) {
    return angular.merge($firebaseAuth(), {
      authenticate: authenticate,
      logout: logout
    });

    /**
     * Authenticate a user with the specified credentials.
     * @param credentials app.Credentials
     * @return Promise
     */
    function authenticate(credentials) {
      return $firebaseAuth()
        .$signInWithPopup("google")
        .then(processUserCredential);
    }

    /**
     * Performs a Firebase logout and returns a promise.
     * @return Promise
     */
    function logout() {
      return $firebaseAuth().$signOut();
    }

    /**
     * Performs the necessary tasks on the firebase.UserCredential object
     * returned by Firebase and returns a clean UserAuth object.
     * @param userCredential firebase.UserCredential
     * @return app.UserAuth
     * @private
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
