import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
import {register} from "../webService/userService";
import config from '../config.json';
import Alert from './Alert';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            avatar:'',
            email:'',
            password:'',
            alert: false,
            text: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            alert: nextProps.alert,
            text: nextProps.text,})
    };

    async handleClick(event){
        this.showElement('#loader');
        this.hideElement('.login');
        let self = this;
        const user = {
            "username": this.state.username,
            "avatar":this.state.avatar,
            "email":this.state.email,
            "password":this.state.password
        };
        await register(config['server'], user)
            .then(doc => {
                this.setState({text: doc.message, alert: true}, ()=>{
                this.hideElement('#loader');
                this.showElement('.login');
                const loginScreen=[];
                loginScreen.push(<Login parentContext={this} updateLoginState={this.props.parentContext.updateLoginState}/>);
                const loginMessage = "Not Registered yet.Go to registration";
                self.props.parentContext.setState({
                    loginScreen:loginScreen,
                    loginMessage:loginMessage,
                    buttonLabel:"Register",
                    isLogin:true
                });
                this.props.updateRegisterState(doc);
            })})
            .catch(err => {
                console.log(err);
            });
    }

    showElement(queryString) {
        const element = document.querySelector(queryString);
        if (element) {
            element.classList.remove('hidden');
        }
    }

    hideElement(queryString) {
        const element = document.querySelector(queryString);
        if (element) {
            element.classList.add('hidden');
        }
    }

    render() {
        if (this.state.open) {return <Alert text={this.state.text} open={this.state.open}/>}
        return (
            <div>
                <MuiThemeProvider>
                    <div className={'login'}>
                        <AppBar
                            title="Register"
                        />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Avatar Url"
                            floatingLabelText="Avatar"
                            onChange = {(event,newValue) => this.setState({avatar:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Length between 8-16, must include lowercase, UPPERCASE & number"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};
export default Register;