(function () {
  "use strict";

  angular.module('app.chat').controller('ChatController', ChatController);

  function ChatController(currentUser, Chats, Images, Profile, $filter, $routeParams, $scope) {

    var vm = this;

    var friendId;
    if ($routeParams.friend) {
      // we are in a private chat
      friendId = $routeParams.friend;
    }

    // Get the current user's information
    if (currentUser) {
      currentUser.profile = Profile.getById(currentUser.uid);
    }

    // Config
    vm.currentUser = currentUser;
    vm.postType = 'text';
    vm.uploadingImages = false;

    /**
     * Switch between text and file input in UI
     * @param type
     */
    vm.toggleInputType = function (type) { vm.postType = type; };

    vm.hashTag = '';
    if ($routeParams.hash) {
      //  chats are filtered for hashtags
      vm.hashTag = '#' + $routeParams.hash;
    }

    //  Pull back appropriate list of chats (public vs private)
    vm.chats = friendId ? Chats.listWithFriend(currentUser.uid, friendId) : Chats.listAll();

    /**
     * Format chat timestamp to make it human readable
     * @param date
     * @return A human readable date
     */
    vm.filterDate = function (date) {
      if (date) { return $filter('date')(new Date(date), 'MMM d, h:mm a '); }
    };

    /**
     * Defines a VM function to create chats.
     * @param content
     */
    vm.newChat = function (content) {
      Chats.postMessage(currentUser.profile, content, vm.friend).then(
        disableSpinner, handleError);
    };

    /**
     * Send an image
     * @param image
     */
    vm.sendImage = function (image) {
      vm.uploadingImages = true;

      // Config
      var originalType = image.type;

      // Check File Type
      if (originalType === 'image/png') { originalType = '.png'; }
      else if (originalType === 'image/jpeg') { originalType = '.jpg'; }
      else {
        alert('Sorry, this file type is not supported, please choose a png or jpg.');
        vm.uploadingImages = false;
        return;
      }

      // Upload Image into Firebase Storage and add to Chat
      Images.uploadImage(currentUser.profile, image)
        .then(function (url) {
          Chats.postImage(currentUser.profile, url.a.downloadURLs[0], vm.friend).then(
            disableSpinner, handleError);
        });
    };

    // Function to update the UI and disable the spinner
    function disableSpinner() {
      vm.uploadingImages = false;
      $scope.$apply();
    }

    function handleError(err) {
      console.log('Error: ', err);
      disableSpinner();
    }

  }

}());
