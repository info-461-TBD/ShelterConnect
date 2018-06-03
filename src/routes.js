import React from "react";
import { Route, IndexRoute } from "react-router";

import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Organizations from "./components/Organizations";
import Request from "./components/Request";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NewRequest from "./components/NewRequest";


const Routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
    <Route path="/request" component={Request} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component ={SignUp} />
    <Route path="/organizations" component={Organizations}/>
    <Route path="/newform" component ={NewRequest} />
    <Route path="*" component={NotFound} />
    
  </Route>
);

export default Routes;
