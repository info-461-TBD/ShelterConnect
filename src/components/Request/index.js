import React, { Component } from "react";
import {Modal} from "react-bootstrap";
import classnames from "classnames";
import { ListItem } from 'react-mdl';

import "./style.css";

const BASEURL = "http://shelterconnect.com/request/";
const DEFAULT_IMG = "";

export default class Request extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var tel = "tel:" + this.props.tel
        var email = "mailto:" + this.props.email + "?Subject=Complete Request " + this.props.id
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Request for {this.props.organization}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={this.props.image} alt=""/>
                    <span>Start Date: {this.props.date}</span>
                    <span>Date Needed by:{this.props.daterequired}</span>
                    <p>
                        {this.props.request}  
                    </p>
                    <a href={tel}>Call</a>
                    <a href={email}>Send Email</a>
                    <address>
                        {this.props.address}
                    </address>
                </Modal.Body>
            </Modal>
        );
    }
}
