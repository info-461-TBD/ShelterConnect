import React from "react";
import ReactDOM from "react-dom";
import { Router, hashHistory } from "react-router";
import Routes from "./routes";
import * as firebase_helper from "./firebase_helper.js";

import "./index.css";

const outlet = document.getElementById("root");


if (firebase_helper.initialize()) {

}

ReactDOM.render(<Router history={hashHistory} routes={Routes} />, outlet);
