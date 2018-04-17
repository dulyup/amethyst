import React, { Component } from 'react';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import PostModalWindow from './PostModalWindow';
import PostList from './PostList';
import Login from './Login';
import LoginScreen from './LoginScreen';
// injectTapEventPlugin();

class Index extends Component {

    constructor(props){
        super(props);
        this.state={
            loginPage:[],
            uploadScreen:[]
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
                {/*<PostList/>*/}
            </div>
        );
    }

}

const style = {
    margin: 15,
};
export default Index;
