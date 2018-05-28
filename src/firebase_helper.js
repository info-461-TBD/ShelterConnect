/*
    This file contains all of the functionality for interacting
    with our firebase intsance. 

    usage: `import * as firebase_helper from "./firebase_helper.js";
*/

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import * as firebase_config from "./firebase_config.js";

/* The firebase database object */
var db;
export { firebase };

/* 
    !! Only run this once in components/index.js !!
    Initializes the firebase app connection
    
    Returns true if firebase_config is valid and the databse
    is initialized.
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

/*
    Signs in the an organization with given email and password.

    Returns true if the user has been signed in successfully. 
*/
export function signInUser(email, password) {
    // user: rykerls@uw.edu pw: test00
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
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

/*
    Returns an array of **all** requests, along with the organization
    information for the org that created the request.
    
    TODD: filter out requests that are expired.
*/
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


/*
    TODO:
        - createuser

*/
