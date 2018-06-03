import React from "react";
import firebase from 'firebase/app';
// import * as firebase_helper from '../../firebase_helper.js';
import 'firebase/auth';
import 'firebase/database';
import { Checkbox } from 'react-bootstrap';
import { browserHistory } from "react-router";

export default class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: undefined,
            currentUser: undefined,
            organizationName: "",
            phoneNum: "",
            email: "",
            streetAddress: "",
            city: "",
            stateName: "",
            zip: "",
            password: "",
            confirm: "",
            website: "",
            description: "",
            check: false,
            personalName: "",
            personalEmail: "",
            elecSign: "",
            reqCount: 0
        };
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);

    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({ currentUser: user });
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    // firebase_helper.createUser(this.state.email, this.state.password, this.state.organizationName, 
                     // this.state.personalEmail, this.state.phoneNum,  this.state.description);
    handleSignUp(evt) {
        evt.preventDefault();
        if (this.state.password !== this.state.confirm) {
            alert("Your passwords do not match");
        } else {
            let user;
            if (this.state.organizationName) {
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(() => {
                        user = firebase.auth().currentUser;
                        user.updateProfile({
                            displayName: this.state.organizationName,
                            email: this.state.email
                        });
                        return user;
                    })
                    .then(user => {
                        firebase.database().ref('/users/' + user.uid).set({
                            name: this.state.organizationName,
                            tel: this.state.phoneNum,
                            email: this.state.email,
                            address: this.state.streetAddress,
                            city: this.state.city,
                            state: this.state.stateName,
                            zip: this.state.zip,
                            website: this.state.website,
                            description: this.state.description
                        });
                    })
                    .then(() => firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password))
                    .then(() => browserHistory.push("/"))
                    .catch(err => console.log(err.message));
            } else {
                 alert("Missing or incorrectly filled out a required field");
            }
        }
    }
    
    handleCheckBox() {
        this.setState({ check: !this.state.check });
    }

    updateReqCount() {
        this.setState({ reqCount: this.state.reqCount + 1 });
        console.log(this.state.reqCount);
    }

    render() {
        let signupStyle = {
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '8px'
        }
        let titleStyle = {
            textAlign: "center",
            fontSize: 60,
            color: "white"
        }
        let textStyle = {
            marginLeft: "8px",
            paddingTop: "5px",
            color: "white"
        }
        let labelStyle = {
            color: "white"
        }

        if (this.state.currentUser) {
            alert("You are already logged in as " + this.state.currentUser.displayName + ". Redirecting you to home....");
            browserHistory.push("/");
        }
        return (
            <section>
                <div className="container" style={signupStyle}>
                    <h1 style={titleStyle}>Sign Up</h1>

                    <form onSubmit={evt => this.handleSignUp(evt)}>
                        <div className="form-group">
                            <h4 style={labelStyle}>Organization Name:</h4>
                            <input id="orgName" type="orgName" className="form-control"
                                placeholder="enter your organization name"
                                value={this.state.organizationName}
                                onInput={evt => this.setState({ organizationName: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Public Phone Number:</h4>
                            <input id="phoneNum" type="phoneNum" className="form-control"
                                placeholder="enter your organization phone number"
                                value={this.state.phoneNum}
                                onInput={evt => this.setState({ phoneNum: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Email:</h4>
                            <input id="email" type="email" className="form-control"
                                placeholder="enter your email address"
                                value={this.state.email}
                                onInput={evt => this.setState({ email: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Street Address:</h4>
                            <input id="stAddress" type="stAddress" className="form-control"
                                placeholder="enter your organization street address"
                                value={this.state.streetAddress}
                                onInput={evt => this.setState({ streetAddress: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>City:</h4>
                            <input id="city" type="city" className="form-control"
                                placeholder="enter your city"
                                value={this.state.city}
                                onInput={evt => this.setState({ city: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>State:</h4>
                            <input id="state" type="state" className="form-control"
                                placeholder="enter your state"
                                value={this.state.stateName}
                                onInput={evt => this.setState({ stateName: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Zip Code:</h4>
                            <input id="zip" type="zip" className="form-control"
                                placeholder="enter your zip code"
                                value={this.state.zip}
                                onInput={evt => this.setState({ zip: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Password:</h4>
                            <input id="password" type="password" className="form-control"
                                placeholder="enter your password"
                                value={this.state.password}
                                onInput={evt => this.setState({ password: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Confirm password:</h4>
                            <input id="confirm-password" type="password" className="form-control"
                                placeholder="confirm password"
                                value={this.state.confirm}
                                onInput={evt => this.setState({ confirm: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Website:</h4>
                            <input id="website" type="website" className="form-control"
                                placeholder="enter your website (if applicable)"
                                value={this.state.website}
                                onInput={evt => this.setState({ website: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Description:</h4>
                            <input id="desc" type="desc" className="form-control"
                                placeholder="enter your description"
                                value={this.state.description}
                                onInput={evt => this.setState({ description: evt.target.value })} />
                        </div>
                        <div>
                            <h4>Terms of Agreement </h4>
                            <span className={textStyle}>“I certify that the answers provided are true and complete to the best of my knowledge, on behalf of my organization. I authorize investigation of all statements contained in this application. I understand that false or misleading information given in my application or future requests may result in discharge at any time.”</span>
                        </div>
                        <Checkbox onChange = {this.handleCheckBox}>
                            I agree to these Terms of Agreement.
                        </Checkbox>
                        <div className="form-group">
                            <h4 style={labelStyle}>Personal Name:</h4>
                            <input id="personalName" type="personalName" className="form-control"
                                placeholder="enter your personal name"
                                value={this.state.personalName}
                                onInput={evt => this.setState({ personalName: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Personal Email:</h4>
                            <input id="personalEmail" type="personalEmail" className="form-control"
                                placeholder="enter your personal email address"
                                value={this.state.personalEmail}
                                onInput={evt => this.setState({ personalEmail: evt.target.value })} />
                        </div>
                        <div className="last-row d-flex">
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    Sign Up
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
                );
    }
}