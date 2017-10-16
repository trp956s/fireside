/* global angular, Firebase, console, _, document, google */
(function () {
  'use strict';

  /**
   * This service manages images, both uploading and deleting.
   * @requires FirebaseRef for the Firebase storage reference
   */
  angular.module('app.svc')
    .factory('Images', ['FirebaseRef', ImagesService]);

  function ImagesService(FirebaseRef) {
    // TODO - Create a reference to the images folder in storage (in /images) [IMG-2]
    var firebaseImages = FirebaseRef.storage.child('images');

    /**
    * Upload an image to firebase storage
    * @param profile the user profile
    * @param image the image object
    * @return {Promise} - firebase response
    */
    function uploadImage(profile, image) {
      // TODO - save an image to Firebase in a user-based path (/images/{userId}/{timestamp}/{imageName}) [IMG-3]
      var imageLocation = profile.uid + '/' + Date.now() + '-' + image.name;
      return firebaseImages.child(imageLocation).put(image);
    } // uploadImage

    /**
    * Delete an image from firebase storage
    * @param location
    * @return {Promise} - firebase response
    */
    function deleteImage(location) {
      // TODO (optional) - delete the given image
      firebaseImages.child(location).delete();
    } // deleteImage


    // ==================================================================== //
    // ========== DO NOT NEED TO MODIFY ANYTHING BELOW THIS LINE ========== //
    // ==================================================================== //


    return {
      uploadImage: uploadImage,
      deleteImage: deleteImage
    };

  }

}());
