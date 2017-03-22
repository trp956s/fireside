(function() {
  "use strict";

  angular.module('app.core')
    .service('FirebaseRef', FirebaseRefService);

    firebase.initializeApp({
      apiKey: "AIzaSyAqvBkj8dpEL22TKMe8f2mfaL7MmEOcLcM",
      authDomain: "app.playingwithfire.live",
      databaseURL: "https://fireside-73c10.firebaseio.com/",
      storageBucket: "fireside-73c10.appspot.com",
      messagingSenderId: "811594146603"
    });

  /**
   * Create Firebase references
   * @return database referance and storage referance
   */
  function FirebaseRefService() {
    return {
      db: firebase.database().ref(),
      //  TODO: add firebase storage ref
    };
  }

}());
