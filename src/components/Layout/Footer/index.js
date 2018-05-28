import React, { Component } from "react";
import classnames from "classnames";

import "./style.css";

export default class Footer extends Component {
	render() {
		return(
			<footer className={classnames("Footer", this.props.className)}>
				<div class="footer"></div>
			</footer>
		);
	}
}
