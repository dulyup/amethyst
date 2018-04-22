import React, { Component } from 'react';
import PostNewWindow from './PostNewWindow';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logout from './Logout';
import '../css/homepage.css'
import config from '../config.json';
import PostCard from "./PostCard";
import {getPostList, postNew} from "../webService/postService";
import LoginScreen from "./LoginScreen";

class Homepage extends Component {

    constructor(props){
        super(props);
        this.state={
            username: this.props.username,
            postList: [],
            update: false,
            logout: false,
        }
    }

    componentWillMount(){
        this.updatePostList();
    }

    componentWillReceiveProps(nextProps) {
        this.updatePostList();
        this.setState({
            postList: nextProps.postList,
            update: nextProps.update
        });
        console.log('refresh');
    }

    updateLogout = () => {
        this.setState({logout: true})
    };

    updatePostList = () => {
        getPostList(config['server'])
            .then(res => {
                console.log(res);
                    this.setState({postList: res})
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    addNewPost = (post) => {
        postNew(config['server'], post)
            .then(() => {
                this.updatePostList()
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    getNewComment = (update) => {
        if (update) {
            this.updatePostList()
        }
    };

    render() {
        if (this.state.logout) {
            return (
                <LoginScreen/>
            )
        } else if (!this.state.postList) {
            return (
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title={`Nice to meet you,  ${this.state.username}`}
                        />
                        <PostNewWindow className={'post-new'}
                                       onSubmitClicked={data => {this.addNewPost(data)}}/>
                        <Logout />
                    </div>
                </MuiThemeProvider>
            )
        } else {
            return (
                <div className={'homepage'}>
                    <MuiThemeProvider>
                        <div>
                            <AppBar
                                title={`Nice to meet you,  ${this.state.username}`}
                            />
                            <PostNewWindow className={'post-new'}
                                           onSubmitClicked={data => {this.addNewPost(data)}}/>
                            <ul>
                                {
                                    this.state.postList.reverse().map(item => {
                                        return (
                                            <PostCard
                                                key = {item._id}
                                                postId = {item._id}
                                                author={item.author.username}
                                                avatarImg={item.author.avatarImg}
                                                date={item.create_on}
                                                content={item.content}
                                                image={item.image}
                                                like={item.like}
                                                commentIdList={item.comment}
                                                updateCommentIdList={this.getNewComment.bind(this)}
                                            />
                                        )
                                    })
                                }
                            </ul>
                            <Logout updateLogout={this.updateLogout.bind(this)}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            );
        }

    }
}

export default Homepage;
