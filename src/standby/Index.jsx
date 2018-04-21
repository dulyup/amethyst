import React, { Component } from 'react';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import PostModalWindow from '../component/PostNewWindow';
import PostList from './PostList';
import Login from '../component/Login';
import LoginScreen from '../component/LoginScreen';
import UploadButton from './UploadButton';
import LogoutButton from '../component/Logout';
import Favorite from './Favorite';
// injectTapEventPlugin();

class Index extends Component {

    constructor(props){
        super(props);
        this.state={
            loginPage:[],
            uploadScreen:[],
            selectedIndex: 0,
        }
    }
    componentWillMount(){
        let loginPage =[];
        loginPage.push(<LoginScreen parentContext={this}/>);
        this.setState({
            loginPage:loginPage
        })
    }
    render() {
        return (
            <div>
                {this.state.loginPage}
                {this.state.uploadScreen}
                <PostModalWindow />
                <LogoutButton />
                {/*<PostList/>*/}
                <Favorite/>
            </div>
        );
    }

}

const style = {
    margin: 15,
};
export default Index;
