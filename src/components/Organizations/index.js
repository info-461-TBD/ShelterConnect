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
            requests: undefined,
            organizations: undefined,
            currentOrganization: undefined,
        }
    }
    componentWillMount() {
        var organizations = getOrganizations();
        this.setState({organizations: organizations});
    }
    render() {
        var organizations;
        organizations = this.state.organizations.map(o =>
          <Organization organization={o}>
          </Organization>
        );
        return(
            <h1>
                {this.props.organization}
            </h1>
        );
    }
}