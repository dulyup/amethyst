import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {login} from '../webService/userService';
import config from '../config.json';
import createHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';
import Homepage from "./Homepage";
const history = createHistory();
const location = history.location;

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            redirect: false
        }
    }

    handleClick(event){
        // Add code in handleClick() after click submit
        console.log('clicked login');

        const user = {
            "username": this.state.username,
            "password": this.state.password
        };

        let self = this;
        login(config['server'], user)
            .then(res => {
                console.log(res); //{username: xx, isSuccess: true}
                // if (res.data.code === 200) {

                    console.log('login successfully');
                    //TODO: jump to homepage
                    this.setState({redirect: true});
                    const uploadScreen = [];
                    // uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>);
                    // self.props.appContext.setState({loginPage:[], uploadScreen: uploadScreen})
                // } else if (res.data.code === 204) {
                //     console.log("Username password do not match");
                // } else {
                //     console.log("Username does not exists");
                // }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        console.log(this.state.redirect);
        if (this.state.redirect) {
            return (
                <div>
                    <Homepage username={this.state.username}/>
                </div>
            );
        } else {
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
            );
        }

    }
}

const style = {
    margin: 15,
};

export default Login;