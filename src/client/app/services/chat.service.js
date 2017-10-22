(function () {
    "use strict";

    /**
     * This service retrieves public chats and private chats between friends. It also
     * creates new chats, either text messages or images.
     * @requires FirebaseRef for the Firebase database reference
     * @requires $firebaseArray to return results from Firebase as an array
     */
    angular.module('app.svc')
        .service('Chats', ['FirebaseRef', '$firebaseArray', ChatsService]);

    function ChatsService(FirebaseRef, $firebaseArray) {

        /**
         * Return all public chats.
         * @return array of chat objects
         */
        function listChats() {
            // reference to database root: /
            var db = firebase.database().ref();

            // reference to chats
            var chatsRef = db.child('/chats');

            // read
            chatsRef.child('-Kf9kfiG0rwnlB1gtquA')
            .once('value').then(function(snapshot) {
                var message = snapshot.val().content;
                console.log(message);
            });

            return $firebaseArray(chatsRef);
        }

        /**
         * Return all private chats between two friends.
         * @param uid the user ID
         * @param friendId the friend ID
         * @return array of chat objects
         */
        function listChatsWithFriend(uid, friendId) {
            return $firebaseArray(FirebaseRef.db.child(`/users/${uid}/chats/${friendId}`));
        }

        /**
         * Create chat function to be used in both content and image chats
         * @private
         * @param uid the user ID
         * @param chatData the chat chatData
         * @param friendId the friend ID (if any)
         * @return Promise
         */
        function createChat(uid, chatData, friendId) {
            var newUpdateKey = FirebaseRef.db.child('chats').push().key;

            //  Write the new chat's chatData either in public chat
            //  OR
            //  simultaneously in user's and friend's profile chat lists
            var updates = {};

            let isPublicChat = !friendId;

            if (isPublicChat) {
                updates[`/chats/${newUpdateKey}`] = chatData;
            } else {
                updates[`/users/${uid}/chats/${friendId}/${newUpdateKey}`] = chatData;
                
                if(friendId !== uid){
                    updates[`/users/${friendId}/chats/${uid}/${newUpdateKey}`] = chatData;
                }
            }

            return FirebaseRef.db.update(updates);
        }

        /**
         * Create a Chat Data object based upon the User Profile
         * @private
         * @param profile the user Profile
         * @return Chat Data object
         */
        function createChatDataForProfile(profile) {
            return {
                uid: profile.uid,
                photoURL: profile.photoURL,
                displayName: profile.displayName,
                timestamp: new Date().toUTCString()
            };
        }


        // ==================================================================== //
        // ========== DO NOT NEED TO MODIFY ANYTHING BELOW THIS LINE ========== //
        // ==================================================================== //


        /**
         * Post an Image to the Chat.
         * @param profile the user profile
         * @param url the image URL
         * @param friendId the friend ID (if any)
         */
        function postImage(profile, url, friendId) {

            var chatData = createChatDataForProfile(profile);
            chatData.sentImage = url;

            // Create the chat
            return createChat(profile.uid, chatData, friendId);
        }

        /**
         * Create chat function to be used in both content and image chats
         * @param profile the user profile
         * @param content the text message
         * @param friendId the friend ID (if any)
         */
        function postMessage(profile, content, friendId) {

            var chatData = createChatDataForProfile(profile);
            chatData.content = content;

            // Create the chat
            return createChat(profile.uid, chatData, friendId);
        }

        return {
            postMessage: postMessage,
            postImage: postImage,
            listAll: listChats,
            listWithFriend: listChatsWithFriend
        };

    }

}());
