import React, { Component } from "react";
import classnames from "classnames";

import logo from "./logo.svg";
import "./style.css";

export default class Home extends Component {
	render() {
		return (
			<div className={classnames("App", this.props.className)}>
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>./components/Home/index.js</code> and save to reload.
				</p>
			</div>
		);
	}
}
