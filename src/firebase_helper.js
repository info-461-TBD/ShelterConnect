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
            // console.log(user.displayName);
            // console.log(user.email);
            // console.log(user.emailVerified);
            // console.log(user.uid);
            // console.log(user.photoURL);
        }
    });

    return true;
}

/* 
    Returns a single request object that corresponds to request with id `id` 
*/
export function getSingleRequest(id) {
    var request = {};

    db.ref("requests/" + id).once('value').then(function(snapshot) {
        var data = snapshot.val();

        var expiration_date = new Date(new Date().setDate(new Date().getDate() - 30));
        var date_added = new Date(data.date_added);

        if (expiration_date <= date_added) {
            request.key = snapshot.key;
            request.date_added = data.date_added;
            request.donation_type = data.donation_type;
            request.request_text = data.request_text;

            var uid = data.ptr_user_account;
            request.uid = uid;

            db.ref("users/" + uid).once('value').then(function(snapshot) {
                var org_data = snapshot.val();
                request.org_address = org_data.org_address;
                request.ord_description = org_data.org_description;
                request.org_email = org_data.org_email;
                request.org_name = org_data.org_name;
                request.org_phone = org_data.org_phone;
            });
        }
    });

    return request;
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

            var expiration_date = new Date(new Date().setDate(new Date().getDate() - 30));
            var date_added = new Date(data.date_added);

            /* If the request was added within last 30 days, add it to the list */
            if (expiration_date <= date_added) {
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
            }
        })
    }, function(errorObject) {
        console.log("read failed: " + errorObject.code);
    });

    return request_list;
}

export function createUser(account_email, password, org_name, photo_url, contact_email, contact_phone, contact_address, org_description) {
    firebase.auth().createUserWithEmailAndPassword(account_email, password).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
    });

    var user = firebase.auth().currentUser;

    if (user) {
        user.sendEmailVerification().then(function() {
            console.log("email sent.");
            user.updateProfile({
                displayName: org_name,
                photoURL: photo_url
            }).then(function() {
                console.log("updated profile");
                writeUserData(user.uid, contact_email, contact_phone, contact_address, org_description);
            }).catch(function(error) {
                console.log(error);
            });
        }).catch(function(error) {
            console.log(error);
        });
    }
}

function writeUserData(uid, org_name, org_email, org_phone, org_address, org_description) {
    db.ref("users/" + uid).set({
        "org_address": org_address,
        "org_description": org_description,
        "org_email": org_email,
        "org_name": org_name,
        "org_phone": org_phone
    }, function(error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("successfully wrote user data.");
        }
    });
}


/*
    TODO:
        - createuser

*/
