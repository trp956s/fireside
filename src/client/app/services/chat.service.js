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
            // TODO - Return all public chats (from /chats) [RTC-1]
            return $firebaseArray(FirebaseRef.db.child('chats'));
        }

        /**
         * Return all private chats between two friends.
         * @param uid the user ID
         * @param friendId the friend ID
         * @return array of chat objects
         */
        function listChatsWithFriend(uid, friendId) {
            // TODO - Return all chats between friends [PVT-2]
            return $firebaseArray(FirebaseRef.db.child('users').child(uid).child('chats').child(friendId));
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
            // TODO - Get Key for new Chat by pushing a new chat (to /chats) [RTC-2]
            var chatId = FirebaseRef.db.child('/chats').push().key;

            //  Write the new chat's chatData either in public chat
            //  OR
            //  simultaneously in user's and friend's profile chat lists
            var updates = {};

            // Public chat
            if (!friendId) {
                // TODO - Add the Chat Data to the updates for the Public Chat object (in /chats/{chatId}) [RTC-3]
                updates['/chats/' + chatId] = chatData;
            }

            // Private Chat
            if (friendId) {
                // TODO - Add the Chat Data to the updates for YOUR Friend Chat object [PVT-3]
                updates['/users/' + uid + '/chats/' + friendId + '/' + chatId] = chatData;

                // Don't want to save it twice if you are chatting with yourself
                if (friendId !== uid) {
                    // TODO - Add the Chat Data to the updates for your FRIEND'S Friend Chat object [PVT-3]
                    updates['/users/' + friendId + '/chats/' + uid + '/' + chatId] = chatData;
                }
            }

            // TODO - Perform the Database Update and return a Promise [RTC-4]
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
                // TODO - Add uid, avatar, and name from Profile [AUTH-6]
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
