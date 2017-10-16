(function () {
  "use strict";

  angular.module('app.friends')
    .controller('FriendsController', ['Friends', 'currentUser', FriendsController]);

  function FriendsController(Friends, currentUser) {

    var vm = this;

    // config
    vm.searchResults = [];
    vm.searched = false;

    // Load Friends
    vm.friends = Friends.list(currentUser.uid);

    /**
     * Search for friends
     * @param email
     */
    vm.searchUsers = function (email) {
      vm.searched = true;
      vm.searchResults = Friends.search(email);
    };

  }

}());
