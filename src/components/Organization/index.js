import React, { Component } from "react";
import { Grid, ListGroup, ListGroupItem, DropdownButton, ButtonGroup, Button, MenuItem } from "react-bootstrap";
import { browserHistory } from "react-router";
import classnames from "classnames";
import "firebase/auth";
import "firebase/database";
import "./style.css"
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
        this.filterRequests("name", this.props.organization.name);
    }

    handleOrganizationChange() {
        this.filterRequests("name", this.props.organization.name);
    }

    render() {
        var tel = "tel:" + this.props.organization.tel;
        var email = "mailto:" + this.props.organization.email;
        var requests;
        if (this.state.requests != null) {
            this.handleOrganizationChange()
            requests = this.state.requests.map (r =>
                <ListGroupItem>
                    <Request request={r}>
                    </Request>
                </ListGroupItem>
            );
        }
        return (
            <div className="organization-profile">
                <h1>{this.props.organization.name}</h1>
                <h4>Description:</h4><br/>
                <p>{this.props.organization.description}</p>
                <div className="contact">
                    <h4>Contact Us!</h4>
                    <p>Phone Number:</p>
                    <a href={tel}>{this.props.organization.tel}</a>
                    <h4>Email:</h4>
                    <a href={email}>{this.props.organization.email}</a>
                    <h4>Address:</h4>
                    <p>{this.props.organization.address}</p>
                    <h4>Website:</h4>
                    <p>{this.props.organization.website}</p>
                </div>
                <h2 className="organization-requests">Requests Open for {this.props.organization.name}</h2>
                <ListGroup>
                    {requests}
                </ListGroup>
            </div>
        );
    }
}