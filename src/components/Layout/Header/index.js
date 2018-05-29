import React, { Component } from "react";
import classnames from "classnames";
import {Navbar, Nav, NavItem} from "react-bootstrap";

import { IndexLink } from "react-router";
import NavLink from "../NavLink";

import "./style.css";

export default class Header extends Component {
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
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
