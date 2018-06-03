import React, { Component } from "react";
import {Modal, Button} from "react-bootstrap";
import classnames from "classnames";
import "./style.css";
const BASEURL = "http://shelterconnect.com/request/";
const DEFAULT_IMG = "";

export default class Request extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    handleClose = () => {
        this.setState({ show: false });
      }
    
    handleShow = () => {
        this.setState({ show: true });
    }
    render() {
        var tel = "tel:" + this.props.request.tel
        var email = "mailto:" + this.props.request.email + "?Subject=Complete Request " + this.props.id
        return (
            <div className="request">
                <p>Request Type: {this.props.request.donationType}</p>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                        details
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Request for {this.props.request.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="request">
                            <h4>Request Type: {this.props.request.donationType}</h4>
                            <h4>Date Needed by: {this.props.request.endDate}</h4>
                            <h4>Description: </h4>
                            <p>
                                {this.props.request.description}  
                            </p>
                            <h4>
                            Address: 
                            </h4>
                            <p>
                                <address>
                                    {this.props.request.address}
                                </address>
                            </p>
                            <h4>
                                Contact Us!:
                            </h4>
                            <p>
                                Give us a <a href={tel}>Call</a> <br/>
                                Send Us an <a href={email}>Email</a>
                            </p>
                        </div>
                    </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
