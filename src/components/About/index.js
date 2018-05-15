import React, { Component } from "react";
import classnames from "classnames";

import "./style.css";

export default class About extends Component {
	render() {
		return (
			<div className={classnames("About", this.props.className)}>
				<h1>
				About
				</h1>
				<p>TODO: Rename this page <code>./components/About/index.js</code></p>
				<p>TODO: Use this as a template page for other pages.</p>
			</div>
		);
	}
}
