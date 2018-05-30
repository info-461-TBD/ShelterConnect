import React from "react";
import { Route, IndexRoute } from "react-router";

import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";

import Request from "./components/Request";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";


const Routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
    <Route path="/request" component={Request} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component ={SignUp} />
    <Route path="*" component={NotFound} />
    
  </Route>
);

export default Routes;
