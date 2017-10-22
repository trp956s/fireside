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
    vm.currentUser = currentUser || {};
    vm.currentUser.profile = currentUser ? Profile.getById(currentUser.uid) : Profile.getById('');

    // Config
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
      Chats.postMessage(vm.currentUser.profile, content, friendId).then(
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
      Images.uploadImage(vm.currentUser.profile, image)
        .then(function (url) {
          Chats.postImage(vm.currentUser.profile, url.a.downloadURLs[0], friendId).then(
            disableSpinner, handleError);
        });
    };

    // Function to update the UI and disable the spinner
    function disableSpinner() {
      vm.content = "";
      vm.uploadingImages = false;
      $scope.$apply();
    }

    function handleError(err) {
      console.log('Error: ', err);
      disableSpinner();
    }

  }

}());
