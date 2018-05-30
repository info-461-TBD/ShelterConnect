import React, { Component } from "react";
import { Grid, ListGroup, ListGroupItem} from "react-bootstrap";
import { browserHistory } from "react-router";
import classnames from "classnames";
import Request from "../Request";
import {getRequestList} from "../../firebase_helper.js";

import "./style.css";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			requests: undefined,
		}
	}

	componentWillMount() {
		this.state.requests = getRequestList();
	}
	handleMove() {
		browserHistory.push("/signup");
	}
	render() {
		var requests;
		requests = this.state.requests.map(r => 
			<ListGroupItem>
				<Request request={r}>
				</Request>
			</ListGroupItem>
		);
		return (
			<div className={classnames("App", this.props.className)}>
				<h3>Connecting shelters with the right patrons to fight against homelessness</h3>
				<span>Organization looking to sign up? <a onClick={this.handleMove}>Register Now</a></span>
				<h1>Open Requests</h1>
				<ListGroup>
					{requests}
				</ListGroup>
			</div>
		);
	}
}
