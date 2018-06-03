import React, { Component } from "react";
import { Grid, ListGroup, ListGroupItem, DropdownButton, ButtonGroup, Button, MenuItem } from "react-bootstrap";
import { browserHistory } from "react-router";
import classnames from "classnames";
import Organization from "../Organization";
import Request from "../Request";
import "firebase/auth";
import "firebase/database";
import firebase from "firebase/app";

export default class Organizations extends Component {
	constructor(props) {
		super(props);
		this.state = {
            userList: undefined,
            currentOrganization: undefined,
        }
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
            this.setState( { userList : result, currentOrganization: result[0]} );
        });
    }

    componentWillMount() {
        this.setUserList();

    }

    handleOrganization = (organization) => {
       this.setState({currentOrganization: organization});
    }

    render() {
        var organizationList;
        var currOrg;
        if (this.state.userList != null && this.state.currentOrganization != null) {
            organizationList = this.state.userList.map(o =>
                <ListGroupItem key={o.id} onClick={() => this.handleOrganization(o)}>
                    {o.name}
                </ListGroupItem>
            );
            currOrg = <Organization organization={this.state.currentOrganization}></Organization>
            
        }
        return(
            <div>
                <h1>
                    Organizations:
                </h1>
                <ListGroup>
                    {organizationList}
                </ListGroup>
                {currOrg}
            </div>
        );
    }
}