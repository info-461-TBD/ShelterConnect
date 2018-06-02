import React from "react";
import firebase from 'firebase/app';
import { browserHistory } from "react-router";
import 'firebase/auth';
import 'firebase/database';


export default class NewRequest extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            
			errorMessage: ""
		}
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
                    <div className="container">
                        <h1>New Request</h1>
                        <form onSubmit={evt => this.handleSignIn(evt)}>
                            <div className="form-group">
                                <h4 style={labelStyle}>Title of request:</h4>
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
                </section>
            </section>
        );
    }


    
}