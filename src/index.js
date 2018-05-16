import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import Routes from "./routes";
import firebase from "firebase";
import * as firebase_config from "./firebase_config.js";

import "./index.css";

const outlet = document.getElementById("root");

firebase.initializeApp(firebase_config.config);

/* This code just for testing the connection to Firebase. */
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.displayName);
        console.log(user.email);
        console.log(user.emailVerified);
        console.log(user.uid);
    }
});

firebase.auth().signInWithEmailAndPassword('rykerls@uw.edu', 'test00').catch(function(error) {
// Handle Errors here.
console.log(error.code);
console.log(error.message);

});

ReactDOM.render(<Router history={browserHistory} routes={Routes} />, outlet);
