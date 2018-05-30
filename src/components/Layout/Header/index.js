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
                this.userRef = firebase.database().ref('users').child(user.uid);
                this.setState({ user: user });
            } else {
                this.setState({ user: undefined });
            }
        });
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
						<NavItem eventKey={1} href="/about">
							About
						</NavItem>
						<NavItem eventKey={2} href="/signin">
							Sign In
						</NavItem>
						<NavItem eventKey={3} href="/signup">
							Register
						</NavItem>
					
						{
		                    this.state.user ?
		                            <Signout user={this.state.user} />
		                         :
		                        null
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
