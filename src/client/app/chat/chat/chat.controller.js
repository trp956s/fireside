(function() {
    "use strict";

    angular.module('app.chat').controller('ChatController', ChatController);

    function ChatController(FirebaseRef, $firebaseArray, currentUser, ProfileSvc, $filter, $routeParams, FirebaseStorage, $scope) {

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
      vm.toggleInputType = function(type) { vm.postType = type; };

      //  Determine whether chats are filtered for hashtags
      if ($routeParams.hash) {
        vm.hashTag = '#' + $routeParams.hash;

      // Determine whether we are in a private chat
      } else if ($routeParams.friend) {
        vm.friend = $routeParams.friend;
      }

      //  Pull back appropriate list of chats (public vs private)
      if (vm.friend) {
        //  TODO: get private chat thread
        vm.chats = [];
      } else {
        //  TODO: get chat thread
        vm.chats = [];
      }

      /**
       * Format chat timestamp to make it human readable
       * @param date
       * @return A human readable date
       */
      vm.filterDate = function (date) {
        if (date) { return $filter('date')(new Date (date), 'MMM d, h:mm a '); }
      };

      /**
       * New Chat
       * @param content
       */
      vm.newChat = function(content) {
        createChat(content);
      };

      /**
       * Send an image
       * @param image
       */
      vm.sendImage = function(image) {
        vm.uploadingImages = true;

      // Config
      var originalType = image.type;

      // Check File Type
      if ( originalType === 'image/png' ) { originalType = '.png'; }
      else if ( originalType === 'image/jpeg' ) { originalType = '.jpg'; }
      else {
        alert('Sorry, this file type is not supported, please choose a png or jpg.');
        vm.uploadingImages = false;
        return;
      }

      var imageLocation = currentUser.profile.uid + '/' + Date.parse(new Date()) + '/' + image.name;

      // Upload Image into Firebase Storage
      FirebaseStorage.uploadImage( imageLocation, image )
        .then( function (url) {
          var content;
          // Create chat
          createChat(content, url, imageLocation);
        });
      };

      /**
       * Create chat function to be used in both content and image chats
       * @param content
       * @param url
       * @param imageLocation
       */
      var createChat = function (content, url, imageLocation) {

        // A new chat
        var data = {
          uid: '', //  TODO: get user authentication Id
          photoURL: '', // TODO: get user url to profile image
          displayName: '', // TODO: get user display name
          timestamp: new Date().toString()
        };

        if (content) { data.content = content; }
        if (url) { data.sentImage = url.a.downloadURLs[0]; }
        if (imageLocation) { data.imageLocation = imageLocation; }

        // TODO: Get Key for new Chat
        var key = "";

        //  Write the new chat's data either in public chat
        //  OR
        //  simultaneously in user's and friend's profile chat lists
        var updates = {};
        // Public chat
        if (!vm.friend) {
          //  TODO: push chat to chat thread (remember this is a simultaneous update)
        }
        // Private Chat
        if (vm.friend) {
          //  TODO: push chat via updates to your own profile under chats and friend's Id (remember this is a simultaneous update)
        }
        // Don't want to save it twice if you are chatting with yourself
        if (vm.friend && vm.friend !== currentUser.profile.uid) {
          //  TODO: push chat via updates to your friend's chat object under your Id (remember this is a simultaneous update)
        }

        //  Updating chat list(s)
        FirebaseRef.db.update(updates).then(function() {
          //  turning off image uploading spinner
          vm.uploadingImages = false;
          vm.content = "";
          $scope.$apply();
        }, function (err) {
          console.log('Error:', err);
          //  turning off image uploading spinner
          vm.uploadingImages = false;
          $scope.$apply();
        });

      };

  }

}());
