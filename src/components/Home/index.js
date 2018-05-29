import React, { Component } from "react";
import classnames from "classnames";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import logo from "./logo.svg";
import "./style.css";

export default class Home extends Component {
	componentDidMount() {
		this.queryByValue("request_text");
	}

	// query data ordered by a given child key
	// child keys: date_added, donation_type, ptr_user_account, request_text
	queryByValue(child) {
		var jsonData = [];
		firebase.database().ref("requests").orderByChild(child).on("child_added", function(snapshot) {
			console.log(snapshot.key + ": " + snapshot.val().child);
			jsonData.push(snapshot);
		});
		return jsonData;
	}
	
	

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
