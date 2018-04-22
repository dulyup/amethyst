import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';
import '../css/homepage.css';
import Homepage from "./Homepage";

class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            loginScreen:[],
            loginMessage:'',
            buttonLabel:'Register',
            isLogin:true,
            loggedIn: false,
            isRegistered: false,
        }
    }

    componentWillMount(){
        let loginScreen=[];
        loginScreen.push(<Login key={0}
                                parentContext={this}
                                appContext={this.props.parentContext}
                                updateLoginState={this.updateLoginState.bind(this)}/>);
        let loginMessage = "Not registered yet, Register Now";
        this.setState({
            loginScreen:loginScreen,
            loginMessage:loginMessage
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loggedIn: nextProps.loggedIn,
            isRegistered: nextProps.isRegistered
        });
    }

    updateLoginState() {
        this.setState({loggedIn: true});
    }

    updateRegisterState() {
        this.setState({isRegistered: true});
    }
    handleClick(event){
        let loginMessage;
        if(this.state.isLogin){
            let loginScreen=[];
            loginScreen.push(<Register key={1}
                                       parentContext={this}
                                       updateRegisterState={this.updateRegisterState.bind(this)}/>);
            loginMessage = "Already registered. Go to Login";
            this.setState({
                loginScreen:loginScreen,
                loginMessage:loginMessage,
                buttonLabel:"Login",
                isLogin:false
            })
        } else {
            let loginScreen=[];
            loginScreen.push(<Login parentContext={this} updateLoginState={this.updateLoginState.bind(this)}/>);
            loginMessage = "Not Registered yet. Go to registration";
            this.setState({
                loginScreen:loginScreen,
                loginMessage:loginMessage,
                buttonLabel:"Register",
                isLogin:true
            })
        }
    }
    
    render() {
        console.log(this.state.loggedIn);
        if (this.state.loggedIn) {
            return (
                <Homepage/>
            );
        } else if (this.state.isRegistered ||!this.state.loggedIn) {
            return (
                <div className="login-screen">
                    {this.state.loginScreen}
                    <div>
                        {this.state.loginMessage}
                        <MuiThemeProvider>
                            <div>
                                <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                            </div>
                        </MuiThemeProvider>
                    </div>
                </div>
            );
        }
    }
}
const style = {
    margin: 15,
};
export default LoginScreen;