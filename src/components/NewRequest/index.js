import React from "react";
import firebase from 'firebase/app';
import { browserHistory } from "react-router";
import {Modal, Button, Grid, ListGroup, ListGroupItem, DropdownButton, ButtonGroup, MenuItem } from "react-bootstrap";
import 'firebase/auth';
import 'firebase/database';


export default class NewRequest extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            user: undefined,
            show: false,
            errorMessage: "",
            donationType: "",   
            endDate: "",
            // phone: firebase.database().ref('users').child(this.state.user.uid).org_phone,
            phone: "",
            email: "",
            address: "",
            description: ""
		}
    }



    handleClose = () => {
        this.setState({ show: false });
      }
    
    handleShow = () => {
        this.setState({ show: true });
    }

    handleNewPost = (evt) => {
        console.log('send info to firebase');
        evt.preventDefault();
        // firebase.database().ref('requests').child(user.uid).push(

        // );
    }

    render() {
        let labelStyle = {
            color: "black"
        }
        let textStyle = {
            marginLeft: "8px",
            paddingTop: "5px",
            color: "black"
        }
        let formStyle = {
            width: "40%"
        }
        return (
            <section>
                <section >
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    Create New Request
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={labelStyle}>New Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <form onSubmit={evt => this.handleNewPost(evt)}>
                            <DropdownButton title="Donation Type" id="bg-nested-dropdown">
					        </DropdownButton>
                            <div className="form-group">
                                <h4 style={labelStyle}>Expiration Date:</h4>
                                <input id="date" type="date" className="form-control"
                                    placeholder="select an expiration date"
                                    value={this.state.endDate}
                                    onInput={evt => this.setState({ endDate: evt.target.value })}
                                    style={formStyle} />
                            </div>
                            <div className="form-group">
                                <h4 style={labelStyle}>Phone:</h4>
                                <input id="phone" type="phone" className="form-control"
                                    placeholder={"Change if different from default organization phone number"}
                                    value={this.state.phone}
                                    onInput={evt => this.setState({ phone: evt.target.value })}
                                    style={formStyle} />
                            </div>
                            <div className="form-group">
                                <h4 style={labelStyle}>Email:</h4>
                                <input id="email" type="email" className="form-control"
                                    placeholder="Change if different from default organization email"
                                    value={this.state.email}
                                    onInput={evt => this.setState({ email: evt.target.value })}
                                    style={formStyle} />
                            </div>
                            <div className="form-group">
                                <h4 style={labelStyle}>Address:</h4>
                                <input id="address" type="address" className="form-control"
                                    placeholder="Change if different from default organization address"
                                    value={this.state.address}
                                    onInput={evt => this.setState({ address: evt.target.value })} 
                                    style={formStyle}/>
                            </div>
                            <div className="form-group">
                                <h4 style={labelStyle}>Description:</h4>
                                <input id="descr" type="descr" className="form-control"
                                    placeholder="Describe your request"
                                    value={this.state.description}
                                    onInput={evt => this.setState({ description: evt.target.value })} 
                                    style={formStyle}/>
                            </div>
                            <div className="last-row d-flex">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                    </Modal>
                </section>
            </section>
        );
    }


    
}