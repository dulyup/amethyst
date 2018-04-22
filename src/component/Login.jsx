import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {login} from '../webService/userService';
import config from '../config.json';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            isLoggedIn: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoggedIn: nextProps.isLoggedIn,
        });
        console.log('refresh');
    }

    handleClick(event){
        // Add code in handleClick() after click submit
        console.log('clicked login');
        const user = {
            "username": this.state.username,
            "password": this.state.password
        };
        login(config['server'], user)
            .then((res) => {
                console.log(res);
                //TODO: jump to homepage
                this.setState({isLoggedIn: true});
                this.props.updateLoginState();
                console.log('login successfully');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>

                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

const style = {
    margin: 15,
};

export default Login;