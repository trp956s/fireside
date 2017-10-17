(function () {
  "use strict";

  /**
   * This service initializes Firebase and returns references to the database and storage.
   */
  angular.module('app.svc')
    .service('FirebaseRef', FirebaseRefService);

  // TODO - Initialize the Firebase App here [START-1]

  /**
   * Create Firebase references
   * @return database referance and storage referance
   */
  function FirebaseRefService() {
    return {
      db: {}, // TODO - Return the Database Reference [START-2]
      storage: {}, // TODO - Return the Storage Reference [IMG-1]
    };
  }

}());
