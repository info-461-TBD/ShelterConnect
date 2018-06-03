import React, { Component } from "react";
import classnames from "classnames";
import { Grid, ListGroup, ListGroupItem, DropdownButton, ButtonGroup, Button, MenuItem } from "react-bootstrap";
import { browserHistory } from "react-router";
import NewRequest from "../NewRequest";
import Request from "../Request";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default class RequestList extends Component {
	constructor(props) {
		super(props);
		this.state= {
			user: undefined
		}
	}

	componentWillMount() {
		// var newRequests = getRequestList();
		// this.setState({requests: newRequests});
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

	handleDate = () => {
		// var newRequests = getRequestList();
		// this.setState({requests: newRequests});
	}
	
	/*
	handleOrganization = () => {
		var newRequests = getOrganizationRequests();
		this.setState({requests: newRequests});
	}
	*/

	render() {
		var requests;
		var organizations;
		requests = this.props.requests.map(r => 
			<ListGroupItem>
				<Request request={r}>
				</Request>
			</ListGroupItem>
		);
		console.log("hi");
		console.log(this.props.organizations[0]);
		organizations = this.props.organizations.map(o =>
			<MenuItem>
				{o.name}
			</MenuItem>
		);
		return (
			<div className={classnames("RequestList", this.props.className)}>
				<h1>Open Requests</h1>
				<span>Filter by:</span>
				<ButtonGroup>
					<Button onClick={this.handleDate}>by date</Button>
					<DropdownButton title="by Organization.." id="bg-nested-dropdown">
						{organizations}
					</DropdownButton>
					<NewRequest user={this.state.user}></NewRequest>
				</ButtonGroup>
				<ListGroup className="request-list">
					{requests}
				</ListGroup>
			</div>
		);
	}
}
