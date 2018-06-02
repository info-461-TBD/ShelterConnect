import React, { Component } from "react";
import { Grid, ListGroup, ListGroupItem, DropdownButton, ButtonGroup, Button, MenuItem } from "react-bootstrap";
import { browserHistory } from "react-router";
import classnames from "classnames";

import Request from "../Request";
import { getRequestList } from "../../firebase_helper.js";

export default class Organization extends Component {
    constructor(props) {
		super(props);
		this.state = {
            requests: undefined
        }
    }
    
    componentWillMount() {
        requests = getOrganizationRequests(this.props.organization.name);
        this.setState({requests: requests});
    }

    render() {
        var tel = "tel:" + this.props.organization.tel;
        var email = "mailto:" + this.props.organization.email;
        this.props.requests.map (r =>
            <ListGroupItem>
                <Request request={r}>
                </Request>
            </ListGroupItem>
        );
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
                </div>
                <ListGroup>
                    {requests}
                </ListGroup>
            </div>
        );
    }
}