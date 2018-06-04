import React, { Component } from "react";
import classnames from "classnames";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import { browserHistory } from "react-router";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { IndexLink } from "react-router";
import NavLink from "../NavLink";

import "./style.css";

export default class Header extends Component {
	constructor(props) {
        super(props);
        this.state = {
            user: undefined
        };
    }

	componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user: user });
            } else {
                this.setState({ user: undefined });
            }
        });
    }

	handleAbout(event) {
        event.preventDefault();
        browserHistory.push("/ShelterConnect/#about/");
        document.location.reload();
	}
	handleOrganization(event) {
        event.preventDefault();
        browserHistory.push("/ShelterConnect/#organizations/");
        document.location.reload();
	}
	handleRegistration(event) {
        event.preventDefault();
        browserHistory.push("/ShelterConnect/#signup/");
        document.location.reload();
	}
	handleSignIn(event) {
        event.preventDefault();
        browserHistory.push("/ShelterConnect/#signin/");
        document.location.reload();
	}
	render() {
		return(
			<Navbar collapseOnSelect>
				<Navbar.Header>
  					<Navbar.Brand>
						<a href="/">ShelterConnect</a>
  					</Navbar.Brand>
  					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<NavItem eventKey={1} onClick={this.handleAbout}>
							About
						</NavItem>
						<NavItem eventKey={2} onClick={this.handleOrganization}>
							Organizations
						</NavItem>
						<NavItem eventKey={3} onClick={this.handleRegistration}>
							Register
						</NavItem>
						
						{
		                    this.state.user ?
		                            <Signout user={this.state.user} />
		                         :
		                        <NavItem eventKey={4} href='#signin/' onClick={this.handleSignIn}>
									Sign In
									</NavItem>
	                	}
                	</Nav>
                </Navbar.Collapse>
			</Navbar>
		);
	}
}

class Signout extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);

    }

    // figure out how to transition to home screen after signing out
    handleSignOut(event) {
        event.preventDefault();
        firebase.auth().signOut().then(browserHistory.push("/"));
        document.location.reload();
    }

    render() {
        return (
            <NavItem eventKey={4} href="/" onClick={this.handleSignOut}>
                Sign Out
            </NavItem>
        );
    }
}
