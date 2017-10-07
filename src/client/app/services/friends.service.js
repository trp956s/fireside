(function () {
  "use strict";

  angular.module('app.svc')
    .service('Friends', ['Profile', 'FirebaseRef', '$firebaseArray', FriendsService]);

  function FriendsService(Profile, FirebaseRef, $firebaseArray) {

    return {
      list: listFriends,
      search: searchFriends,
    };

    function listFriends(uid) {
      var list = $firebaseArray(FirebaseRef.db.child('users').child(uid).child('chats'));

      // Get Friends Profile
      list.$watch(function () {
        angular.forEach(list, function (friend) {
          friend.profile = Profile.getById(friend.$id);
        });
      });

      return list;
    }

    function searchFriends(email) {
      return $firebaseArray(FirebaseRef.db.child('profiles').orderByChild('email').equalTo(email));
    }

  }

}());
