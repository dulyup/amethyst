import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Homepage from "./Homepage";
import Login from './Login';
import Register from './Register';
import '../css/homepage.css';
import Alert from "./alert";

class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            avatar: '',
            email: '',
            loginScreen:[],
            loginMessage:'',
            buttonLabel:'Register',
            isLogin:true,
            loggedIn: false,
            isRegistered: false,
            logout: this.props.logout,
            alert: false,
            text: '',
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
            isRegistered: nextProps.isRegistered,
            logout: nextProps.logout,
            username: nextProps.username,
            avatar: nextProps.avatar,
            email: nextProps.email,
            loginScreen:nextProps.loginScreen,
            loginMessage:nextProps.loginMessage,
            buttonLabel:nextProps.buttonLabel,
            isLogin:nextProps.isLogin,
            alert: nextProps.alert,
            text: nextProps.text,
        });
    }

    updateLoginState(doc) {
        const context = this.parentContext;
        if (!context || context === 'LoginScreen') {
            this.setState({
                loggedIn: true,
                username: doc.username,
                avatar: doc.avatar,
                email: doc.email,
            });
        } else {
            const self = context.props.parentContext;
            console.log(self);
            self.setState({
                loggedIn: true,
                username: doc.username,
                avatar: doc.avatar,
                email: doc.email,
            });
        }
    }

    updateRegisterState(doc) {
        this.setState({
            isRegistered:!this.state.isRegistered, isLogin: true});
        if (doc) {this.setState({text:doc.message,alert:true})}
    }

    clearAlert(){this.setState({text:'',alert:false})}

    handleClick(event){
        let loginMessage;
        if(this.state.isLogin){
            let loginScreen=[];
            loginScreen.push(<Register key={1}
                                       parentContext={this}
                                       updateRegisterState={this.updateRegisterState.bind(this)}
                                       // updateLoginStateFromRegister={this.updateLoginStateFromRegister.bind(this)}
            />);
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
        const loading=require('../img/loading.gif');
        /**
         * Display Homepage
         */
        if (this.state.loggedIn) {
            return (
                <div>
                    <div className='hidden' id='loading'><p className='img'><img src={loading} alt="loading gif"/></p></div>
                    <Homepage username={this.state.username} avatar={this.state.avatar} email={this.state.email}/>
                </div>
            );
        }
        /**
         * Display login screen
         */
        return (
            <div>
                <Alert alert={this.state.alert} text={this.state.text} clearAlert={this.clearAlert.bind(this)}/>
                <div className='hidden' id='loading'><p className='img'><img src={loading} alt="loading gif"/></p></div>
                <div className="login">
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
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default LoginScreen;