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
    }

    handleClick(event){
        const user = {
            "username": this.state.username,
            "password": this.state.password
        };
        this.showElement('#loading');
        this.hideElement('.login');
        login(config['server'], user)
            .then((doc) => {
                /**
                 * avatar:"https://images.harrods.com/product/harrods/peter-rabbit-printed-notebook_000000000005800701.jpg?dwn=520px:592px"
                 email:"rob@163.com"
                 username:"Robert"
                 */
                this.props.updateLoginState(doc);
                this.setState({isLoggedIn: true},()=>{this.hideElement('#loading');this.showElement('.login')}
                );
            })
            .catch(function (error) {
                console.log(error);
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
        const loading=require('../img/loading.gif');
        return (
            <div className={'login'}>
                <div className='hidden' id='loading'><p className='img'><img src={loading} alt="loading gif"/></p></div>
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