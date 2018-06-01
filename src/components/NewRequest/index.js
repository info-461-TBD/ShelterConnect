import React from "react";
import firebase from 'firebase/app';
import { browserHistory } from "react-router";
import {Modal, Button} from "react-bootstrap";
import 'firebase/auth';
import 'firebase/database';


export default class NewRequest extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            show: false,
			errorMessage: ""
		}
    }

    handleClose = () => {
        this.setState({ show: false });
      }
    
    handleShow = () => {
        this.setState({ show: true });
    }
    render() {
        let labelStyle = {
            color: "white"
        }
        let textStyle = {
            marginLeft: "8px",
            paddingTop: "5px",
            color: "white"
        }
        let formStyle = {
            width: "58%"
        }
        return (
            <section>
                <section >
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    Create New Request
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <h1>Sign In</h1>
                        <form onSubmit={evt => this.handleSignIn(evt)}>
                            <div className="form-group">
                                <h4 style={labelStyle}>Email:</h4>
                                <input id="email" type="email" className="form-control"
                                    placeholder="enter your email address"
                                    value={this.state.email}
                                    onInput={evt => this.setState({ email: evt.target.value })}
                                    style={formStyle} />
                            </div>
                            <div className="form-group">
                                <h4 style={labelStyle}>Password:</h4>
                                <input id="password" type="password" className="form-control"
                                    placeholder="enter your password"
                                    value={this.state.password}
                                    onInput={evt => this.setState({ password: evt.target.value })} 
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