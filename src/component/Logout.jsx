import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {logout} from "../webService/userService";
import config from '../config.json';

const style = {
    margin: 12,
};

class Logout extends Component {

    constructor(props) {
        super(props);
        this.state={
            rediect: false,
        }
    }
    handleClick(event){
        console.log('logout clicked');
        logout(config['server'])
            .then(res => {
                console.log(res); //{username: xx, isSuccess: true}
                // if (res.data.code === 200) {

                console.log('logout successfully');
                //TODO: jump to homepage
                this.setState({redirect: true});
                // const uploadScreen = [];
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
        return (
            <div>
                <RaisedButton label="Logout" style={style} onClick={(event) => this.handleClick(event)}/>
            </div>
        );
    }
}


export default Logout;