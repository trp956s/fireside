(function () {
    "use strict";

    angular.module('app.svc')
        .service('Chats', ['FirebaseRef', '$firebaseObject', '$firebaseArray', ChatsService]);

    function ChatsService(FirebaseRef, $firebaseObject, $firebaseArray) {

        return {
            postMessage: postMessage,
            postImage: postImage,
            listAll: listChats,
            listWithFriend: listChatsWithFriend
        };

        function listChats() {
            return $firebaseArray(FirebaseRef.db.child('chats'));
        }

        function listChatsWithFriend(uid, friend) {
            return $firebaseArray(FirebaseRef.db.child('users').child(uid).child('chats').child(friend));
        }

        /**
         * Post an Image to the Chat.
         * @param profile the user profile
         * @param url the image URL
         * @param friend the friend ID (if any)
         */
        function postImage(profile, url, friend) {

            // A new chat
            var data = {
                uid: profile.uid,
                photoURL: profile.photoURL,
                displayName: profile.displayName,
                timestamp: new Date().toUTCString(),
                sentImage: url
            };

            // Create the chat
            return createChat(profile, data, friend);
        }

        /**
         * Create chat function to be used in both content and image chats
         * @param profile the user profile
         * @param content the text message
         * @param friend the friend ID (if any)
         */
        function postMessage(profile, content, friend) {

            // A new chat
            var data = {
                uid: profile.uid,
                photoURL: profile.photoURL,
                displayName: profile.displayName,
                timestamp: new Date().toUTCString(),
                content: content
            };

            // Create the chat
            return createChat(profile, data, friend);
        }

        /**
         * Create chat function to be used in both content and image chats
         * @param profile the user profile
         * @param data the chat data
         * @param friend the friend ID (if any)
         * @private
         */
        function createChat(profile, data, friend) {
            // Get Key for new Chat
            var key = FirebaseRef.db.child('/chats').push().key;

            //  Write the new chat's data either in public chat
            //  OR
            //  simultaneously in user's and friend's profile chat lists
            var updates = {};
            // Public chat
            if (!friend) {
                updates['/chats/' + key] = data;
            }
            // Private Chat
            if (friend) {
                updates['/users/' + profile.uid + '/chats/' + friend + '/' + key] = data;

                // Don't want to save it twice if you are chatting with yourself
                if (friend !== profile.uid) {
                    updates['/users/' + friend + '/chats/' + profile.uid + '/' + key] = data;
                }
            }

            //  Updating chat list(s)
            return FirebaseRef.db.update(updates);
        }
    }

}());
