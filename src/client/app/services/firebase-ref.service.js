(function () {
  "use strict";

  angular.module('app.svc')
    .service('FirebaseRef', FirebaseRefService);

  // TODO - Initialize the Firebase App here [START-1]
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
      db: firebase.database().ref(), // TODO - Return the Database Reference [START-2]
      storage: firebase.storage().ref(), // TODO - Return the Storage Reference [IMG-1]
    };
  }

}());
