(function () {
  "use strict";

  angular.module('app.chat').controller('ChatController', ChatController);

  function ChatController(Chats, FirebaseRef, $firebaseArray, currentUser, ProfileSvc, $filter, $routeParams, Images, $scope) {

    var vm = this;

    // Get the current user's information
    if (currentUser) {
      currentUser.profile = ProfileSvc.getProfileByID(currentUser.uid);
    }

    // Config
    vm.currentUser = currentUser;
    vm.hashTag = '';
    vm.postType = 'text';
    vm.uploadingImages = false;

    /**
     * Switch between text and file input in UI
     * @param type
     */
    vm.toggleInputType = function (type) { vm.postType = type; };

    //  Determine whether chats are filtered for hashtags
    if ($routeParams.hash) {
      vm.hashTag = '#' + $routeParams.hash;

      // Determine whether we are in a private chat
    } else if ($routeParams.friend) {
      vm.friend = $routeParams.friend;
    }

    //  Pull back appropriate list of chats (public vs private)
    vm.chats = vm.friend ? Chats.listWithFriend(currentUser.uid, vm.friend) : Chats.listAll();

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
