import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';
import '../css/mainPage.css';

class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            loginScreen:[],
            loginMessage:'',
            buttonLabel:'Register',
            isLogin:true
        }
    }

    componentWillMount(){
        let loginScreen=[];
        loginScreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
        let loginMessage = "Not registered yet, Register Now";
        this.setState({
            loginScreen:loginScreen,
            loginMessage:loginMessage
        })
    }

    handleClick(event){
        console.log("event",event);
        let loginMessage;
        if(this.state.isLogin){
            let loginScreen=[];
            loginScreen.push(<Register parentContext={this}/>);
            loginMessage = "Already registered.Go to Login";
            this.setState({
                loginScreen:loginScreen,
                loginMessage:loginMessage,
                buttonLabel:"Login",
                isLogin:false
            })
        } else {
            let loginScreen=[];
            loginScreen.push(<Login parentContext={this}/>);
            loginMessage = "Not Registered yet.Go to registration";
            this.setState({
                loginScreen:loginScreen,
                loginMessage:loginMessage,
                buttonLabel:"Register",
                isLogin:true
            })
        }
    }
    
    render() {
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
const style = {
    margin: 15,
};
export default LoginScreen;