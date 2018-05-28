import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import Routes from "./routes";
import * as firebase_helper from "./firebase_helper.js";

import "./index.css";

const outlet = document.getElementById("root");

if (firebase_helper.initialize()) {
    //Signs in user rykerls@uw.edu
    // if (firebase_helper.signInUser("rykerls@uw.edu", "test00")) {
        
    // }
    // console.log(firebase_helper.getRequestList());
}

ReactDOM.render(<Router history={browserHistory} routes={Routes} />, outlet);
