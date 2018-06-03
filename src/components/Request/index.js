import React, { Component } from "react";
import {Modal, Button} from "react-bootstrap";
import classnames from "classnames";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const BASEURL = "http://shelterconnect.com/request/";
const DEFAULT_IMG = "";

export default class Request extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            matches: false,
            userID: this.props.request.key,
            edit: ""
        };
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            let match = (user.displayName == this.props.request.organization);
            this.setState({ matches: match });
        });
    }

    handleClose = () => {
        this.setState({ show: false });
      }
    
    handleShow = () => {
        this.setState({ show: true });
    }

    editData(evt, reqSnapshot) {
        evt.preventDefault();
        reqSnapshot.ref.update({
            "description": this.state.edit
        });
        this.setState({edit: ""});
    }

    deleteData(evt, reqSnapshot) {
        evt.preventDefault();
        reqSnapshot.ref.remove();
    }

    render() {
        let reqSnapshot = firebase.database().ref("/requests/" + this.state.userID);

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
                {
                    this.state.matches ?
                        <div>
                            <form onSubmit={evt => this.editData(evt, reqSnapshot)}>
                                <div className="form-group">
                                    <input type="text" className="form-control" 
                                    placeholder="edit your description"
                                    value={this.state.edit}
                                    onInput={evt => this.setState({edit: evt.target.value})}/>
                                </div>
                                <button type="submit" className="mx-1">Edit</button> 
                                <button className="mx-1" onClick={evt => this.deleteData(evt, reqSnapshot)}>Delete</button>
                            </form>
                        </div>
                    : undefined
                }
            </Modal.Footer>
            </Modal>
        );
    }
}
