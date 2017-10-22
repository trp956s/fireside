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
    var firebaseImages = FirebaseRef.storage.child('images');

    /**
    * Upload an image to firebase storage
    * @param profile the user profile
    * @param image the image object
    * @return {Promise} - firebase response
    */
    function uploadImage(profile, image) {
      return firebaseImages.child(`users/${profile.uid}/`).put(image);
    } 

    /**
    * Delete an image from firebase storage
    * @param location
    * @return {Promise} - firebase response
    */
    function deleteImage(location) {
      // TODO (optional) - delete the given image
    } // deleteImage


    // ==================================================================== //
    // ========== DO NOT NEED TO MODIFY ANYTHING BELOW THIS LINE ========== //
    // ==================================================================== //


    return {
      uploadImage: uploadImage,
      deleteImage: deleteImage
    };

  }

} ());
