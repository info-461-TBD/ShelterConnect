import React from "react";
import firebase from 'firebase/app';
import { FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';
import 'firebase/auth';
import 'firebase/database';
import { browserHistory } from "react-router";

export default class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: undefined,
            currentUser: undefined,
            organizationName: "",
            phoneNum: "",
            phoneNumValid: false,
            email: "",
            streetAddress: "",
            city: "",
            stateName: "",
            zip: "",
            zipValid: false,
            password: "",
            confirm: "",
            website: "",
            websiteValid: false,
            description: "",
            check: false,
            personalName: "",
            personalEmail: "",
            elecSign: "",
            personalSignature: ""
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

    handleSignUp(evt) {
        evt.preventDefault();
        if (this.state.password !== this.state.confirm) {
            alert("Your passwords do not match");
        } else if(this.state.check == false) {
            alert("You have not agreed to the terms of agreement");
            this.state.check == true;
        } else if (this.state.organizationName == "" || this.state.phoneNum == "" || this.state.email == "" ||
                    this.state.streetAddress == "" || this.state.city == "" || this.state.stateName == "" ||
                    this.state.zip == "" || this.state.password == "" || this.state.confirm == "" ||
                    this.state.description == "" || this.state.personalEmail == "" || 
                    this.state.personalName == "" || this.state.personalSignature == ""){
            alert("One (or more) of the required fields is missing. Please review your application to see what information is missing.");
        } else if(this.state.phoneNumValid == false) {
            alert("Please enter a valid phone number");
            this.state.phoneNumValid == true;
        } else if (this.state.zipValid == false) {
            alert("Please enter a valid zip code");
            this.state.zipValid == true;
        } else if (this.state.website && this.state.websiteValid == false) {
            alert("Please enter a valid website");
            this.state.websiteValid == true;
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
                            description: this.state.description,
                            personalName: this.state.personalName,
                            personalEmail: this.state.personalEmail,
                            personalSignature: this.state.personalSignature
                        });
                    })
                    .then(() => firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password))
                    .then(() => browserHistory.push("/"))
                    .catch(err => console.log(err.message));
            } else {
                alert("Email or password is incorrect.");
            }
        }
    }

    validatePhoneNumber(elementValue){
        var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return phoneNumberPattern.test(elementValue);
    }

    validateZipCode(elementValue){
        var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
        return zipCodePattern.test(elementValue);
    }

    validateWebsite(elementValue) {
        var websitePattern = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
        return websitePattern.test(elementValue);
    }

    handleCheckBox() {
        this.setState({ check: !this.state.check });
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
        let requiredStyle = {
            color: "red"
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
                            <h4 style={labelStyle}>Organization Name: <span style={requiredStyle}>* </span></h4>
                            <input id="orgName" type="text" className="form-control"
                                placeholder="Enter your organization name"
                                value={this.state.organizationName}
                                onInput={evt => this.setState({ organizationName: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Public Phone Number: <span style={requiredStyle}>* </span></h4>
                            <input id="phoneNum" type="text" className="form-control"
                                placeholder="Enter your organization phone number"
                                value={this.state.phoneNum}
                                onInput={evt => this.setState({ phoneNum: evt.target.value, phoneNumValid: this.validatePhoneNumber(evt.target.value) })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Email: <span style={requiredStyle}>* </span></h4>
                            <input id="email" type="email" className="form-control"
                                placeholder="Enter your email address"
                                value={this.state.email}
                                onInput={evt => this.setState({ email: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Street Address: <span style={requiredStyle}>* </span></h4>
                            <input id="stAddress" type="stAddress" className="form-control"
                                placeholder="Enter your organization street address"
                                value={this.state.streetAddress}
                                onInput={evt => this.setState({ streetAddress: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>City: <span style={requiredStyle}>* </span></h4>
                            <input id="city" type="city" className="form-control"
                                placeholder="Enter your city"
                                value={this.state.city}
                                onInput={evt => this.setState({ city: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>State: <span style={requiredStyle}>* </span></h4>
                            <input id="state" type="state" className="form-control"
                                placeholder="Enter your state"
                                value={this.state.stateName}
                                onInput={evt => this.setState({ stateName: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Zip Code: <span style={requiredStyle}>* </span></h4>
                            <input id="zip" type="zip" className="form-control"
                                placeholder="Enter your zip code"
                                value={this.state.zip}
                                onInput={evt => this.setState({ zip: evt.target.value, zipValid: this.validateZipCode(evt.target.value) })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Password: <span style={requiredStyle}>* </span></h4>
                            <input id="password" type="password" className="form-control"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onInput={evt => this.setState({ password: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Confirm password: <span style={requiredStyle}>* </span></h4>
                            <input id="confirm-password" type="password" className="form-control"
                                placeholder="Confirm password"
                                value={this.state.confirm}
                                onInput={evt => this.setState({ confirm: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Website:</h4>
                            <input id="website" type="website" className="form-control"
                                placeholder="Enter your website (if applicable)"
                                value={this.state.website}
                                onInput={evt => this.setState({ website: evt.target.value, websiteValid: this.validateWebsite(evt.target.value) })} />
                        </div>
                        <FormGroup controlId="formControlsTextarea">
                            <h4 style={labelStyle}>Description: <span style={requiredStyle}>* </span></h4>
                            <FormControl componentClass="textarea" placeholder="Enter your description" 
                            value={this.state.description} onInput={evt => this.setState({ description: evt.target.value })}/>
                        </FormGroup>

                        <div>
                            <h4>Terms of Agreement </h4>
                            <span className={textStyle}>“I certify that the answers provided are true and complete to the best of my knowledge, on behalf of my organization. I authorize investigation of all statements contained in this application. I understand that false or misleading information given in my application or future requests may result in discharge at any time.”</span>
                        </div>
                        <Checkbox onChange={this.handleCheckBox}>
                            I agree to these Terms of Agreement. <span style={requiredStyle}>* </span>
                        </Checkbox>
                        <div className="form-group">
                            <h4 style={labelStyle}>Personal Name: <span style={requiredStyle}>* </span></h4>
                            <input id="personalName" type="personalName" className="form-control"
                                placeholder="Enter your personal name"
                                value={this.state.personalName}
                                onInput={evt => this.setState({ personalName: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Personal Email: <span style={requiredStyle}>* </span></h4>
                            <input id="personalEmail" type="email" className="form-control"
                                placeholder="Enter your personal email address"
                                value={this.state.personalEmail}
                                onInput={evt => this.setState({ personalEmail: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <h4 style={labelStyle}>Electronic Signature: <span style={requiredStyle}>* </span></h4>
                            <input id="personalSignature" type="text" className="form-control"
                                placeholder="Enter your signature"
                                value={this.state.personalSignature}
                                onInput={evt => this.setState({ personalSignature: evt.target.value })} />
                        </div>
                        <div className="last-row">
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    Sign Up 
                            </button>
                            <span style={requiredStyle}> * required </span>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}