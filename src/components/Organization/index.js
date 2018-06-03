import React, { Component } from "react";
import { Grid, ListGroup, ListGroupItem, DropdownButton, ButtonGroup, Button, MenuItem } from "react-bootstrap";
import { browserHistory } from "react-router";
import classnames from "classnames";
import "firebase/auth";
import "firebase/database";

import firebase from "firebase/app";
import Request from "../Request";
import { getRequestList } from "../../firebase_helper.js";

export default class Organization extends Component {
    constructor(props) {
		super(props);
		this.state = {
            requests: undefined
        }
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

    componentWillMount() {
        this.filterRequests("donationType", "Clothes");
    }

    render() {
        var tel = "tel:" + this.props.organization.tel;
        var email = "mailto:" + this.props.organization.email;
        var requests;
        if (this.state.requests != null) {
            requests = this.state.requests.map (r =>
                <ListGroupItem>
                    <Request request={r}>
                    </Request>
                </ListGroupItem>
            );
        }
        return (
            <div className="organization-profile">
                <img src={this.props.organization.image}/>
                <h1>{this.props.organization.name}</h1>
                <p>{this.props.organization.description}</p>
                <div className="contact">
                    <h3>Contact Us!</h3>
                    <p>Phone Number:</p> <br/>
                    <a href={tel}>{this.props.organization.tel}</a>
                    <p>Email:</p> <br/>
                    <a href={email}>{this.props.organization.email}</a>
                    <p>Address:</p> <br/>
                    <p>{this.props.organization.address}</p>
                    <p>Website:</p>
                    <p>{this.props.organization.website}</p>
                </div>
                <ListGroup>
                    {requests}
                </ListGroup>
            </div>
        );
    }
}