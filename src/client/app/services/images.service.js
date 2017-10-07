/* global angular, Firebase, console, _, document, google */
(function() {
  'use strict';

  angular.module('app.svc')
  .factory('Images', ['FirebaseRef', ImagesService]);


  function ImagesService(FirebaseRef) {

    //var storage = firebase.storage(); // Initalize Firebase Storage
    var storageRef = FirebaseRef.storage; // Create Reference
    var firebaseImages = storageRef.child('images'); // Create Reference

    return {
      uploadImage: uploadImage,
      deleteImage: deleteImage
    };

    /**
    * Upload an image to firebase storage
    * @param profile the user profile
    * @param image the image object
    * @return {Promise} - firebase response
    */
    function uploadImage(profile, image) {
      var imageLocation = profile.uid + '/' + Date.now() + '/' + image.name;
      return firebaseImages.child(imageLocation).put(image);
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
