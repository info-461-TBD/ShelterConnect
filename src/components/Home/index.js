import React, { Component } from "react";
import { Grid, ListGroup, ListGroupItem, DropdownButton, ButtonGroup, Button, MenuItem } from "react-bootstrap";
import { browserHistory } from "react-router";
import classnames from "classnames";
import {getRequestList} from "../../firebase_helper.js";
import RequestList from "../RequestList";
import NewRequest from "../NewRequest";
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

    sortByNew = () => {
		var result = [];
		var json;
		var data;
		var item;
		let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		firebase.database().ref("requests").once("value", function(snapshot) {
            data = snapshot.val();
        }).then(() => {
        	for (json in data) {
        		for (item in data[json]) {
                    result.push(data[json][item]);
                }
        	}
        	result.sort(function(a,b){
        		let aDate = months[parseInt(a.endDate.substring(5, 7))] + " " + a.endDate.substring(8) + ", " + a.endDate.substring(0, 4);
        		let bDate = months[parseInt(b.endDate.substring(5, 7))] + " " + b.endDate.substring(8) + ", " + b.endDate.substring(0, 4);
				return new Date(bDate) - new Date(aDate);
			});
        	this.setState( { requests: result });
        });
	}

	sortByOld = () => {
		var result = [];
		var json;
		var data;
		var item;
		let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		firebase.database().ref("requests").once("value", function(snapshot) {
            data = snapshot.val();
        }).then(() => {
        	for (json in data) {
        		for (item in data[json]) {
                    result.push(data[json][item]);
                }
        	}
        	result.sort(function(a,b){
        		let aDate = months[parseInt(a.endDate.substring(5, 7))] + " " + a.endDate.substring(8) + ", " + a.endDate.substring(0, 4);
        		let bDate = months[parseInt(b.endDate.substring(5, 7))] + " " + b.endDate.substring(8) + ", " + b.endDate.substring(0, 4);
				return new Date(aDate) - new Date(bDate);
			});
        	this.setState( { requests: result });
        });
	}

	componentWillUnmount() {
		this.authUnsub();
	}

	handleOrganization = (organization) => {
		this.filterRequests("name", organization.name);
	}

	render() {
		var requests;
		var organizations;
		if (this.state.userList != null && this.state.requests != null) {
			requests = <RequestList requests={this.state.requests} organizations={this.state.userList}>
			</RequestList>
			organizations = this.state.userList.map(u =>  
				<MenuItem onClick={() => this.handleOrganization(u)}>
					{u.name}
				</MenuItem>
			);
		}
		return (
			<div className={classnames("App", this.props.className)}>
				<h3>Connecting shelters with the right patrons to fight against homelessness</h3>
				<span>Organization looking to sign up? <a onClick={this.handleMove}>Register Now</a></span>
				<h1>{this.state.user ? "Hello " + this.state.user.displayName : "Hello guest"}</h1>
				<h4>Filter by:</h4>
				<ButtonGroup>
					<DropdownButton title="by Date.." id="bg-nested-dropdown">
						<MenuItem onClick={this.sortByNew}> Newest To Oldest
						</MenuItem>
						<MenuItem onClick={this.sortByOld}> Oldest to Newest
						</MenuItem>
					</DropdownButton>
					<DropdownButton title="by Organization.." id="bg-nested-dropdown">
						{organizations}
					</DropdownButton>
					<NewRequest user={this.state.user}></NewRequest>
				</ButtonGroup>
				{requests}
			</div>
		);
	}
}