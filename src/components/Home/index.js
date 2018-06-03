import React, { Component } from "react";
import { Grid, ListGroup, ListGroupItem, DropdownButton, ButtonGroup, Button, MenuItem } from "react-bootstrap";
import { browserHistory } from "react-router";
import classnames from "classnames";
import NewRequest from "../NewRequest";
import Request from "../Request";
import * as firebase_helper from "../../firebase_helper.js";
import RequestList from "../RequestList";
import firebase from "firebase/app";
import "./style.css";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: "",
			user: undefined,
			requests: []
		}
	}

	componentWillMount() {
		// var newRequests = getRequestList();
		// this.setState({requests: newRequests});
	}

	handleMove() {
		browserHistory.push("/signup");
	}
  
	componentDidMount() {
		this.authUnsub = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
				this.setState({ user: user });
			}
		});
	}

	componentWillUnmount() {
		this.authUnsub();
	}

	render() {
		return (
			<div className={classnames("App", this.props.className)}>
				<h3>Connecting shelters with the right patrons to fight against homelessness</h3>
				<span>Organization looking to sign up? <a onClick={this.handleMove}>Register Now</a></span>
				<RequestList requests={this.state.requests} organizations={this.state.organizations}></RequestList>
			</div>
		);
	}
}