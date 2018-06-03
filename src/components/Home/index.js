import React, { Component } from "react";
import { Grid, ListGroup, ListGroupItem, DropdownButton, ButtonGroup, Button, MenuItem } from "react-bootstrap";
import { browserHistory } from "react-router";
import classnames from "classnames";
import {getRequestList} from "../../firebase_helper.js";
import RequestList from "../RequestList";
import firebase from "firebase/app";
import "./style.css";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: "",
			user: undefined,
			organizations: [],
			currentRequests: [],
			requests: []
		}
	}

	componentWillMount() {
		this.setUserList();
		this.filterRequests();
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
    setUserList = () => {
        let result = [];
        let data;
        let acc;

        firebase.database().ref("users").once("value", function(snapshot) {
            data = snapshot.val();
        }).then(() => {
            for (acc in data) {
                let curr = data[acc];
                result.push(curr);
            }
            this.setState( { userList : result} );
        });
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
            this.setState( { requests : result} );
        });
    }
	componentWillUnmount() {
		this.authUnsub();
	}

	render() {
		var requests;
		if (this.state.userList != null && this.state.requests != null) {
			console.log(JSON.stringify(this.state.userList));
			requests = <RequestList requests={this.state.requests} organizations={this.state.userList}>
			</RequestList>
		}
		return (
			<div className={classnames("App", this.props.className)}>
				<h3>Connecting shelters with the right patrons to fight against homelessness</h3>
				<span>Organization looking to sign up? <a onClick={this.handleMove}>Register Now</a></span>
				<h1>{this.state.user ? "Hello " + this.state.user.displayName : "Hello guest"}</h1>
				{requests}
			</div>
		);
	}
}