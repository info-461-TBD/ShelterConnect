import React, { Component } from "react";
import classnames from "classnames";
import Joseph from "./Joseph.jpg";
import Ryker from "./Ryker.jpg";
import Simon from "./Simon.jpg";
import Sunwoo from "./Sunwoo.jpg";
import { Row, Col } from "react-bootstrap";
import "./style.css";

export default class About extends Component {
	render() {
		let photoStyle = {
			width: '150px',
			height: '150px',
			borderRadius: '50%'
		}
		let sectionStyle = {
			paddingTop: '10px',
			paddingBottom: '10px'
		}
		let infoStyle = {
			paddingTop: '5px',
			textAlign: 'center'
		}
		return (
			<div className={classnames("About", this.props.className)}>
				<div className="body">
					<h1>Our Mission</h1>
					<p>Our team values the humanity and integrity of all peoples. We want to connect the organizations that are working for the greater good with volunteers that want to join in the cause to fight against homelessness. </p>
					<h1 style={sectionStyle}>The Problem</h1>
					<p>Homelessness is a serious issue all across America. In a recent study, it was found that over half a million people are considered homeless in the United States. There are over <b>11,000</b> people that are homeless in Seattle alone, <b>47.1%</b> of which are suffering without shelter. We know that there are several organizations in our city that are working towards ending homelessness once and for all, but the issue will not disappear overnight. No matter how noble their mission may be, they still need help.</p>
					<h1 style={sectionStyle}>Our Solution</h1>
					<p>Our solution to combating homelessness in Seattle is to centralize the information that will help homeless shelters receive the proper donations they need. Through our website, organizations can post donation requests based on any specific events or drives that they are running. Some organizations are smaller and may not have the opportunity to advertise for help outside of their immediate circle of connections. But with this website, volunteers and donors can view these posts from any organization to see what items or resources that they can give to these causes. We simply want to connect those who need help with those who can offer it.
					<br />
						<br />
						We believe that this can really help fight against homelessness.
	We believe in the organizations that are working hard to provide resources for those in need. We believe in the people that want to help see better living conditions for all. And we believe in the common people of society, who can really make a difference by laying down what they have. We know that our solution will help connect all of these people to make society a better place.</p>
					<h1 style={sectionStyle}>Who We Are </h1>
					
				</div>
				<section id="testimonials">
						<Row>
							<Col class="testimonial" style={infoStyle} md={3}>
								<img src={Joseph} alt="profile photo" class="profile-img" style={photoStyle} />
								<h2>Joseph Zhang </h2>
								<h4>Developer</h4>

							</Col>
							<Col class="testimonial" style={infoStyle} md={3}>
								<img src={Ryker} alt="profile photo" class="profile-img" style={photoStyle} />
								<h2>Ryker Schwartzenberger </h2>
								<h4>Developer</h4>
							</Col>
							<Col class="testimonial" style={infoStyle} md={3}>
								<img src={Simon} alt="profile photo" class="profile-img" style={photoStyle} />
								<h2>Simon Bang </h2>
								<h4>Developer</h4>
							</Col>
							<Col class="testimonial" style={infoStyle} md={3}> 
								<img src={Sunwoo} alt="profile photo" class="profile-img" style={photoStyle} />
								<h2>Sunwoo Kang</h2>
								<h4>Project Manager</h4>
							</Col>
						</Row>
					</section>
			</div>
		);
	}
}
