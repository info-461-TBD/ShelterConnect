import React, { Component } from "react";
import classnames from "classnames";

import "./style.css";

export default class About extends Component {
	render() {
		return (
			<div className={classnames("About", this.props.className)}>
				<div className="body">
					<h1>Our Mission</h1>
					<p>Our team values the humanity and integrity of all peoples. We want to connect the organizations that are working for the greater good with volunteers that want to join in the cause to fight against homelessness. </p>
					<h1>The Problem</h1>
					<p>Homelessness is a serious issue all across America. In a recent study, it was found that over half a million people are considered homeless in the United States. There are over <b>11,000</b>people that are homeless in Seattle alone, <b>47.1%</b> of which are suffering without shelter. We know that there are several organizations in our city that are working towards ending homelessness once and for all, but the issue will not disappear overnight. No matter how noble their mission may be, they still need help.</p>
					<h1>Our Solution</h1>
					<p>Our solution to combating homelessness in Seattle is to centralize the information that will help homeless shelters receive the proper donations they need. Through our website, organizations can post donation requests based on any specific events or drives that they are running. Some organizations are smaller and may not have the opportunity to advertise for help outside of their immediate circle of connections. But with this website, volunteers and donors can view these posts from any organization to see what items or resources that they can give to these causes. We simply want to connect those who need help with those who can offer it.
					<br/>
					<br/>
	We believe that this can really help fight against homelessness. 
	We believe in the organizations that are working hard to provide resources for those in need. We believe in the people that want to help see better living conditions for all. And we believe in the common people of society, who can really make a difference by laying down what they have. We know that our solution will help connect all of these people to make society a better place.</p>
				</div>
			</div>
		);
	}
}
