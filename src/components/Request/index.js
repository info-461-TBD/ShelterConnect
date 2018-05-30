import React, { Component } from "react";
import {Modal, Button} from "react-bootstrap";
import classnames from "classnames";

const BASEURL = "http://shelterconnect.com/request/";
const DEFAULT_IMG = "";

export default class Request extends React.Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
      }
    
    handleShow() {
    this.setState({ show: true });
    }
    render() {
        var tel = "tel:" + this.props.request.tel
        var email = "mailto:" + this.props.request.email + "?Subject=Complete Request " + this.props.id
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Request for {this.props.request.organization}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={this.props.request.image} alt=""/>
                    <span>Start Date: {this.props.request.date}</span>
                    <span>Date Needed by:{this.props.request.daterequired}</span>
                    <p>
                        {this.props.request.details}  
                    </p>
                    <a href={tel}>Call</a>
                    <a href={email}>Send Email</a>
                    <address>
                        {this.props.request.address}
                    </address>
                </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}
