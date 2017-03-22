/* global angular, Firebase, console, _, document, google */
(function() {
  'use strict';

  angular.module('app.core')
  .factory('FirebaseStorage', ['FirebaseRef', FirebaseStorageService]);


  function FirebaseStorageService(FirebaseRef) {

    //var storage = firebase.storage(); // Initalize Firebase Storage
    var storageRef = FirebaseRef.storage; // Create Reference
    var firebaseImages = storageRef.child('images'); // Create Reference

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
      return firebaseImages.child(location).put(file);
    } // uploadImage
    
    /**
    * Delete an image from firebase storage
    * @param location
    * @return {Promise} - firebase response
    */
    function deleteImage(location) {
      firebaseImages.child(location).delete();
    } // deleteImage

  }

}());
