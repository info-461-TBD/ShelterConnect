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

	filterRequests = (criteria, critVal) => {
        var result = [];
        var json;
        var item;
        let data;

        firebase.database().ref("requests").once("value", function(snapshot) {
            data = snapshot.val();
        }).then(() => {
            for (json in data) {
                for (item in data[json]) {
                    if (data[json][item][criteria] == critVal) {
                        result.push(data[json][item]);
                    }
                }
            }
            this.setState({ requests : result} );
        });
    }

	render() {
		var requests;
		if (this.props.requests != null) {
			requests = this.props.requests.map(r => 
				<ListGroupItem>
					<Request request={r}>
					</Request>
				</ListGroupItem>
			);
		}
		return (
			<div className={classnames("RequestList", this.props.className)}>
				<h1>Open Requests</h1>
				<span>Filter by:</span>

				<ListGroup className="request-list">
					{requests}
				</ListGroup>
			</div>
		);
	}
}
