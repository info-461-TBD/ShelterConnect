import firebase from "firebase";
import * as firebase_config from "./firebase_config.js";

/* The firebase database object */
var db;

/* 
    Initializes the firebase app connection
    You only need to run this once in components/index.js
*/
export function initialize() {
    try {
        firebase.initializeApp(firebase_config.config);
        db = firebase.database();
    }
    catch(error) {
        console.error(error);
        
        return false;
    }

    return true;
}

export function signInUser() {
    firebase.auth().signInWithEmailAndPassword('rykerls@uw.edu', 'test00').catch(function(error) {
        // Handle Errors here.
        console.log(error.code);
        console.log(error.message);
        
        return false;
    });

    /* This code just for testing the connection to Firebase. */
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user.displayName);
            console.log(user.email);
            console.log(user.emailVerified);
            console.log(user.uid);
            console.log(user.photoURL);
        }
    });

    return true;
}

export function getRequestList() {
    var request_list = [];

    var request_ref = db.ref("requests");
    request_ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var element = {};
            var data = childSnapshot.val();

            element.key = childSnapshot.key;
            element.date_added = data.date_added;
            element.donation_type = data.donation_type;
            element.request_text = data.request_text;
            
            var uid = data.ptr_user_account;
            element.uid = uid
            
            db.ref("users/" + uid).once('value').then(function(snapshot) {
                var cdata = snapshot.val()
                element.org_address = cdata.org_address;
                element.org_description = cdata.org_description;
                element.org_email = cdata.org_email;
                element.org_name = cdata.org_name;
                element.org_phone = cdata.org_phone;
            });

            request_list.push(element);
        })
    }, function(errorObject) {
        console.log("read failed: " + errorObject.code);
    });

    return request_list;
}

