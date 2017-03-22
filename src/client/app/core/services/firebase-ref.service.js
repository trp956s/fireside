(function() {
  "use strict";

  angular.module('app.core')
    .service('FirebaseRef', FirebaseRefService);

    //  TODO: Initialize Firebase Here

  /**
   * Create Firebase references
   * @return database referance and storage referance
   */
  function FirebaseRefService() {
    return {
      // TODO: add firebase database ref
      //  TODO: add firebase storage ref
    };
  }

}());
