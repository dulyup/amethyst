import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
import {register} from "../webService/userService";
import config from '../config.json';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            avatar:'',
            email:'',
            password:''
        };
    }

    handleClick(event){
        //Add code here if you want to do something after register clicked
        console.log('register clicked');
        //TODO:check for empty values before hitting submit
        //TODO: whitelist
        let self = this;
        const user = {
            "username": this.state.username,
            "avatar":this.state.avatar,
            "email":this.state.email,
            "password":this.state.password
        };
        console.log(user);
        register(config['server'], user)
            .then(res => {
                console.log(res);
                if(res.data.code === 200){
                    //  console.log("registration successfull");
                    const loginScreen=[];
                    loginScreen.push(<Login parentContext={this}/>);
                    const loginMessage = "Not Registered yet. Go to registration";
                    self.props.parentContext.setState({
                        loginScreen:loginScreen,
                        loginMessage:loginMessage,
                        buttonLabel:"Register",
                        isLogin:true
                    });
                }
            })
            .catch(err => console.log(err));
        //TODO: if registered successfully, jump to Login page

    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
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
                            hintText="Enter your Password"
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