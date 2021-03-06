import React from "react";
import firebase from 'firebase/app';
import { browserHistory } from "react-router";
import 'firebase/auth';
import 'firebase/database';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: undefined,
            currentUser: undefined,
            email: "",
            password: ""
        };
    }
    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({ currentUser: user });
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }
    handleSignIn(evt) {
        evt.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => browserHistory.push("/ShelterConnect/#"))
            .then(() => document.location.reload())
            .then(console.log(this.state.currentUser))
            .catch(err => alert(err.message));
    }

    render() {
        let signinStyle = {
            width: "50%",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '8px'
        }
        let labelStyle = {
            color: "white"
        }
        let textStyle = {
            marginLeft: "8px",
            paddingTop: "5px",
            color: "white"
        }
        let titleStyle = {
            fontSize: 60,
            color: "white"
        }
        let formStyle = {
            width: "47%",
        }
        return (
            <section>
                <section style={signinStyle}>
                    <div className="container">
                        <h1 style={titleStyle}>Sign In</h1>
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
                                        Sign In
                            </button>
                                </div>
                                <p style={textStyle}><a href="/ShelterConnect/#signup">Don't yet have an account?</a></p>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        );
    }
}