import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PostCard from "./PostCard";
import RaisedButton from 'material-ui/RaisedButton';
import '../css/postCard.css'
import '../css/homepage.css'
import {getPostByName} from "../webService/postService";
import config from '../config.json';

class MyPost extends Component {
    constructor(props){
        super(props);
        this.state={
            username: this.props.username,
            postList: [],
        }
    }

    async componentWillMount() {
        await this.getMyPost();
    }

    async getMyPost() {
        await getPostByName(config['server'], this.state.username)
            .then(doc => {
                this.setState({postList: doc})
            })
            .catch(e => console.log(e))
    }

    handleBack() {
        this.props.goHomepage();
    }

    render() {
        const loading=require('../img/loading.gif');

        return (
            <div className={'homepage'}>
                <div className='hidden' id='loading'><p className='img'><img src={loading} alt="loading gif"/></p></div>
                <div>
                    <MuiThemeProvider>
                        <AppBar title={`Your all posts,  ${this.state.username}`}/>
                        <div className={'post-card'}>
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
                                                updateCommentIdList={this.props.updateCommentIdList}
                                            />
                                        )
                                    })
                                }
                            </ul>
                            <div className={'logout'}>
                                <RaisedButton label="Go back" onClick={this.props.goHomepage}/>
                            </div>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

export default MyPost;