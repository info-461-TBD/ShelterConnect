"use strict";

var firebase = require("firebase");


(document.onload = function() {
    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyCfqkIBncKJpCIULK3ybVL6ue95B5mO8AQ",
    authDomain: "shelterconnect-info461.firebaseapp.com",
    databaseURL: "https://shelterconnect-info461.firebaseio.com",
    projectId: "shelterconnect-info461",
    storageBucket: "",
    messagingSenderId: "954855526076"
    };
    firebase.initializeApp(config);

    console.log("loaded index.js");


})();