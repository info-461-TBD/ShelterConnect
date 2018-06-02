import React, { Component } from "react";
import { Grid, ListGroup, ListGroupItem, DropdownButton, ButtonGroup, Button, MenuItem } from "react-bootstrap";
import { browserHistory } from "react-router";
import classnames from "classnames";
import NewRequest from "../NewRequest";
import Request from "../Request";
import {getRequestList} from "../../firebase_helper.js";
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
		var newRequests = getRequestList();
		this.setState({requests: newRequests});
	}
	handleMove() {
		browserHistory.push("/signup");
	}
  
	componentDidMount() {
		this.queryByValue("request_text");
		this.authUnsub = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
				this.setState({ user: user });
			}
		});
	}

	componentWillUnmount() {
		this.authUnsub();
	}

	handleDate = () => {
		var newRequests = getRequestList();
		this.setState({requests: newRequests});
	}
	
	/*
	handleOrganization = () => {
		var newRequests = getOrganizationRequests();
		this.setState({requests: newRequests});
	}
	*/
  
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
		var requests;
		requests = this.state.requests.map(r => 
			<ListGroupItem>
				<Request request={r}>
				</Request>
			</ListGroupItem>
		);
		/*organizations = this.state.organizations.map(o =>
			<MenuItem key={o.id}>
				{o.name}
			</MenuItem>
		);
		*/
		return (
			<div className={classnames("App", this.props.className)}>
				<h3>Connecting shelters with the right patrons to fight against homelessness</h3>
				<span>Organization looking to sign up? <a onClick={this.handleMove}>Register Now</a></span>
				<h1>Open Requests</h1>
				<span>Filter by:</span>
				<ButtonGroup>
					<Button onClick={this.handleDate}>by date</Button>
					<DropdownButton title="by Organization.." id="bg-nested-dropdown">
					</DropdownButton>
					<NewRequest></NewRequest>
				</ButtonGroup>
				<ListGroup className="request-list">
					{requests}
				</ListGroup>
				<h1>{this.state.user ? console.log(this.state.user) : "Hello guest"}</h1>
			</div>
		);
	}
}