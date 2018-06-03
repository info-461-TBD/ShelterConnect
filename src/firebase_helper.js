/*
    This file contains all of the functionality for interacting
    with our firebase intsance. 

    usage: `import * as firebase_helper from "./firebase_helper.js";
*/

/*
    TODO:
        - createuser
        - updateuser
        - createRequest
        - editRequest
        - filter and sorting of request list
*/

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import * as firebase_config from "./firebase_config.js";

/* The firebase database object */
var db;
var users = [];
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
    Don't use this function. It will be removed once Sunny updates his code not to call this function.
    (It's better just to perfrom the sign-in/out functionality directly in the component, rather than have
    a wrappera around it.)
*/
export function signInUser(email, password) {
    return true;
}

/* 
    Returns an array of request objects that corresponds to 
    - 'criteria' such as one of the following: [donationType, endDate]
    - with specific value being 'critVal'
*/
export function filterRequests(criteria, critVal) {
    var result = [];
    var json;
    var item;

    db.ref("requests").once("value", function(snapshot) {
        var data = snapshot.val();
        for (json in data) {
            for (item in data[json]) {
                if (data[json][item][criteria] == critVal) {
                    result.push(data[json][item]);
                }
            }
        }
    });

    return result;
}

/*
    Returns an array of ALL requests in the db
*/
export function getRequests() {
    var result = [];
    var req;

    db.ref("requests").once("value", function(snapshot) {
        var data = snapshot.val();
        for (req in data) {
            result.push(data[req]);
        }
    });
    return result;
}


/*
    Returns an array of ALL users in the db
*/
export function retrieveUsers() {
    let result = new Array();
    let acc;
    let data;

    return db.ref("users");
}

/* 
    Returns a single request object that corresponds to request with id `id` 
*/
// export function getSingleRequest(id) {
//     var request = {};

//     db.ref("requests/" + id).once('value').then(function(snapshot) {
//         var data = snapshot.val();

//         var expiration_date = new Date(new Date().setDate(new Date().getDate() - 30));
//         var date_added = new Date(data.date_added);

//         if (expiration_date <= date_added) {
//             request.key = snapshot.key;
//             request.date_added = data.date_added;
//             request.donation_type = data.donation_type;
//             request.request_text = data.request_text;

//             var uid = data.ptr_user_account;
//             request.uid = uid;

//             db.ref("users/" + uid).once('value').then(function(snapshot) {
//                 var org_data = snapshot.val();
//                 request.org_address = org_data.org_address;
//                 request.ord_description = org_data.org_description;
//                 request.org_email = org_data.org_email;
//                 request.org_name = org_data.org_name;
//                 request.org_phone = org_data.org_phone;
//             });
//         }
//     });

//     return request;
// }

/*
    Returns an array of **all** requests, along with the organization
    information for the org that created the request.
    
    TODD: filter out requests that are expired.
*/
// export function getRequestList() {
//     var request_list = []
//     var request_ref = db.ref("requests");
//     request_ref.on("value", function(snapshot) {
//         snapshot.forEach(function(childSnapshot) {
//             var element = [];
//             var data = childSnapshot.val();

//             var expiration_date = new Date(new Date().setDate(new Date().getDate() - 30));
//             var date_added = new Date(data.date_added);

//             /* If the request was added within last 30 days, add it to the list */
//             if (expiration_date <= date_added) {
//                 element.key = childSnapshot.key;
//                 element.date_added = data.date_added;
//                 element.donation_type = data.donation_type;
//                 element.request_text = data.request_text;
            
//                 var uid = data.ptr_user_account;
//                 element.uid = uid
            
//                 db.ref("users/" + uid).once('value').then(function(snapshot) {
//                     var cdata = snapshot.val()
//                     element.org_address = cdata.org_address;
//                     element.org_description = cdata.org_description;
//                     element.org_email = cdata.org_email;
//                     element.org_name = cdata.org_name;
//                     element.org_phone = cdata.org_phone;
//                 });

//                 request_list.push(element);
//             }
//         })
//     }, function(errorObject) {
//         console.log("read failed: " + errorObject.code);
//     });
//     return request_list;
// }

/*
    Creates a new firebase user and stores additional information in the database, tied to that user account.
*/ 
export function createUser(account_email, password, org_name, contact_email, contact_phone, org_description) {
    firebase.auth().createUserWithEmailAndPassword(account_email, password).then(function() {
        console.log("signed up.");
        var user = firebase.auth().currentUser;
        if (user) {
            console.log("updating profile");
            user.updateProfile({
                displayName: org_name
            }).then(function() {
                console.log("writing to users/");
                writeUserData(user.uid, org_name, contact_email, contact_phone, org_description);
            }).catch(function(error) {
                console.log(error);
            });
        }
    }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
    });
    
}


/* 
    !! This is a private function. Don't call it from outside this file. !!

    Writes the passed arguments to the `users/<uid>` section of the database.
*/
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
