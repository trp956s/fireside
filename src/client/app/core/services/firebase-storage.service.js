/* global angular, Firebase, console, _, document, google */
(function() {
  'use strict';

  angular.module('app.core')
  .factory('FirebaseStorage', ['FirebaseRef', FirebaseStorageService]);


  function FirebaseStorageService(FirebaseRef) {

    return {
      uploadImage: uploadImage,
      deleteImage: deleteImage
    };

    /**
    * Upload an image to firebase storage
    * @param location
    * @param file
    * @return {Promise} - firebase response
    */
    function uploadImage(location, file) {

    }

    /**
    * Delete an image from firebase storage
    * @param location
    * @return {Promise} - firebase response
    */
    function deleteImage(location) {
      // BONUS
    }

  }

}());
