import React, { Component } from 'react';
import PostNewWindow from './PostNewWindow';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logout from './Logout';
import '../css/homepage.css'
import config from '../config.json';
import PostCard from "./PostCard";
import {getPostList, postNew} from "../webService/postService";

class Homepage extends Component {

    constructor(props){
        super(props);
        this.state={
            username: this.props.username,
            postList: [],
        }
    }

    componentWillMount(){
        this.updatePostList();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({postList: nextProps.postList });
    }

    updatePostList = () => {
        getPostList(config['server'])
            .then(res => {
                console.log(res); //{username: xx, isSuccess: true}
                // if (res.data.code === 200) {
                //TODO: jump to homepage
                this.setState({postList: res});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    addNewPost = (post) => {
        postNew(config['server'], post)
            .then(res => {
                // if (res.status === 200) {
                this.updatePostList()
                // }
                })
                .catch(function (error) {
                    console.log(error);
                });
    };

    render() {
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
                                      author={item.author.username}
                                      avatarImg={item.author.avatarImg}
                                      date={item.create_on}
                                      content={item.content}
                                      image={item.image}
                                      like={item.like}
                                      />
                                  )
                              })
                            }
                        </ul>
                        <Logout />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};
export default Homepage;
