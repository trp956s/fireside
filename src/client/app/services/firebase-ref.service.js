(function () {
  "use strict";

  /**
   * This service initializes Firebase and returns references to the database and storage.
   */
  angular.module('app.svc')
    .service('FirebaseRef', FirebaseRefService);

    // Initialize Firebase
  let config = {see:'add firebase to your web app'};
  firebase.initializeApp(config);

  /**
   * Create Firebase references
   * @return database referance and storage referance
   */
  function FirebaseRefService() {
    return {
      db: firebase.database().ref(), 
      storage: firebase.storage().ref()
    };
  }

}());
