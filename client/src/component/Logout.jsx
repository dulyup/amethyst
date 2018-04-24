import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {logout} from "../webService/userService";
import '../css/homepage.css';

const style = {
    margin: 12,
};

class Logout extends Component {

    constructor(props) {
        super(props);
        this.state={
            redirect: false,
        }
    }

    handleClick(event){
        logout()
            .then(() => {
                console.log('logout successfully');
                this.props.updateLogout();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className={'logout'}>
                <RaisedButton label="Log out" style={style} onClick={(event) => this.handleClick(event)}/>
            </div>
        );
    }
}

export default Logout;