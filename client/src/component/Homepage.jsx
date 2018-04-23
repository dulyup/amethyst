import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logout from './Logout';
import LoginScreen from "./LoginScreen";
import PostCard from "./PostCard";
import PostNewWindow from './PostNewWindow';
import MyPost from './MyPost';
import RaisedButton from 'material-ui/RaisedButton';
import {getPostList, postNew} from "../webService/postService";
import '../css/homepage.css'
import config from '../config.js';

class Homepage extends Component {

    constructor(props){
        super(props);
        this.state={
            username: this.props.username,
            avatar: this.props.avatar,
            email: this.props.email,
            postList: [],
            update: false,
            logout: false,
            open: false,
            reopen: false,
        }
    }

    componentWillMount(){
        this.updatePostList();
    }

    componentWillReceiveProps(nextProps) {
        this.updatePostList();
        this.setState({
            postList: nextProps.postList,
            update: nextProps.update,
            open: nextProps.open,
            reopen: nextProps.reopen,
        });
    }

    updateLogout = () => {
        this.setState({logout: true})
    };

    updatePostList = () => {
        this.hideElement('.homepage');
        this.showElement('#loading');
        getPostList(config.server)
            .then(res => {this.setState({postList: res}, ()=>{
                this.hideElement('#loading');
                this.showElement('.homepage');
            })})
            .catch(function (error) {
                console.log(error);
            });
    };

    addNewPost = (post) => {
        this.hideElement('.homepage');
        this.showElement('#loading');
        postNew(config.server, post)
            .then(() => {
                this.updatePostList();
                this.hideElement('#loading');
                this.showElement('.homepage');
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

    async goHomepage() {
        this.hideElement('.my-post');
        this.showElement('#loading');
        await this.setState({reopen: true, open: false});
        this.showElement('.homepage');
        this.hideElement('#loading');
    };

    handleOpen = () => {this.setState({open: true})};

    showElement(queryString) {
        const element = document.querySelector(queryString);
        if (element) {element.classList.remove('hidden');}
    }

    hideElement(queryString) {
        const element = document.querySelector(queryString);
        if (element) {element.classList.add('hidden');}
    }

    render() {
        const loading=require('../img/loading.gif');
        if (this.state.logout) {
            return (
                <div>
                    <div className='hidden' id='loading'><p className='img'><img src={loading} alt="loading gif"/></p></div>
                    <div className={'login'}>
                        <LoginScreen logout={this.state.logout}/>
                    </div>
                </div>
            )
        } else if (!this.state.postList) {
            return (
                <MuiThemeProvider>
                    <div className='hidden' id='loading'><p className='img'><img src={loading} alt="loading gif"/></p></div>
                    <div className={'homepage'}>
                        <div className='hidden' id='loading'><p className='img'><img src={loading} alt="loading gif"/></p></div>
                        <AppBar
                            title={`Nice to meet you,  ${this.state.username}`}
                        />
                        <PostNewWindow className={'post-new'}
                                       onSubmitClicked={data => {this.addNewPost(data)}}/>
                        <Logout />
                    </div>
                </MuiThemeProvider>
            )
        } else if (this.state.open) {
            return (
                <div className={'my-post'}>
                    <MyPost
                        username={this.state.username}
                        updateCommentIdList={this.getNewComment.bind(this)}
                        goHomepage={this.goHomepage.bind(this)}/>
                </div>)

        }
            return (
                <div>
                    <div className='hidden' id='loading'><p className='img'><img src={loading} alt="loading gif"/></p></div>
                    <MuiThemeProvider>
                        <div className={'homepage'}>
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
                            <div className={'my-post-button'}>
                                <RaisedButton label="My Post" onClick={this.handleOpen}/>
                            </div>
                        </div>
                    </MuiThemeProvider>
                </div>
            );

    }
}

export default Homepage;
