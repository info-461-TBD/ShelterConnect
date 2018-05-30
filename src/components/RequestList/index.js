import React, { Component } from "react";
import classnames from "classnames";
import Request from "../Request";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default class RequestList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={classnames("RequestList", this.props.className)}>
				<h1>
					Requests List
				</h1>

			</div>
		);
	}
}
