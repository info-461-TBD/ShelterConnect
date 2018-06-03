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
            donationType: "Donation Type",   
            endDate: "",
            phone: "",
            email: "",
            address: "",
            description: ""
		}
    }
    
    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ currentUser: user });
                this.populateForm();
            }
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    populateForm = () => {
        var userId = this.state.currentUser.uid;
        var dbRef = firebase.database().ref('users').child(userId);
        dbRef.once('value', snapshot => {
            let snap = snapshot.val();
            this.setState({ user: snap.name });
            this.setState({ phone: snap.tel });
            this.setState({ email: snap.email });
            this.setState({ address: snap.address });
        });
    }

    handleClose = () => {
        this.setState({ show: false });
    }
    
    handleShow = () => {
        this.setState({ show: true });
    }

    handleNewPost = (evt) => {
        evt.preventDefault();
        firebase.database().ref('requests').push({
            donationType: this.state.donationType,
            endDate: this.state.endDate,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            description: this.state.description
        });
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
                            <DropdownButton title={this.state.donationType} id="bg-nested-dropdown">
                                <MenuItem eventKey='1'
                                onClick={evt => this.setState({ donationType: 'Clothes' })}>Clothes</MenuItem>
                                <MenuItem eventKey='2'
                                onClick={evt => this.setState({ donationType: 'Food' })}>Food</MenuItem>
                                <MenuItem eventKey='3' 
                                onClick={evt => this.setState({ donationType: 'Items' })}>Items</MenuItem>
                                <MenuItem eventKey='4' 
                                onClick={evt => this.setState({ donationType: 'Money' })}>Money</MenuItem>
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
                                    placeholder={this.state.phone}
                                    value={this.state.phone}
                                    onInput={evt => this.setState({ phone: evt.target.value })}
                                    style={formStyle} />
                            </div>
                            <div className="form-group">
                                <h4 style={labelStyle}>Email:</h4>
                                <input id="email" type="email" className="form-control"
                                    placeholder={this.state.email}
                                    value={this.state.email}
                                    onInput={evt => this.setState({ email: evt.target.value })}
                                    style={formStyle} />
                            </div>
                            <div className="form-group">
                                <h4 style={labelStyle}>Address:</h4>
                                <input id="address" type="address" className="form-control"
                                    placeholder={this.state.address}
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