import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import { darkBlack } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {getCommentById, addNewComment} from "../webService/commentService";

class Comment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
            open: this.props.open,
            commentIdList: this.props.commentIdList,
            commentList: [],
            newComment:'',
            submitDisabled: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.getComment();
        this.setState({
            open: nextProps.open,
            commentIdList: nextProps.commentIdList,
            commentList: nextProps.commentList,
            newComment: nextProps.newComment,
            submitDisabled: nextProps.submitDisabled
        });
    }

    handleClose = () => {
        this.setState({open: false});
    };

    async handleSubmit() {
        try{
            if (this.state.newComment) {
                await addNewComment(this.state.postId, this.state.newComment);
                this.props.updateCommentIdList(true);
                this.setState({open: false});
            }
        }catch (e) {
            console.log(e);
        }
    };

    async getComment() {
        try{
            if (this.state.commentIdList) {
                const commentList = [];
                for (let id of this.state.commentIdList) {
                    const comment = await getCommentById(id);
                    commentList.push(comment);
                }
                await this.setState({commentList: commentList})
            }
        }catch (e) {
            console.log(e);
        }
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={this.state.submitDisabled}
                onClick={this.handleSubmit.bind(this)}
            />,
        ];

        if (!this.state.commentList) {
            return (
                <Dialog
                    actions={actions}
                    open={this.state.open}>
                    <ListItem
                        primaryText={'No Comment Yet'}
                    />
                    <Paper zDepth={2}>
                        <Divider/>
                        <TextField
                            hintText="Add your comment"
                            floatingLabelText="Your Comment"
                            onChange={(event, newValue) => {this.setState({newComment: newValue});
                                newValue ? this.setState({submitDisabled: false}) : this.setState({submitDisabled: true})
                            }}
                            style={style}
                            underlineShow={false}
                        />
                        <br/>
                        <Divider/>
                    </Paper>
                </Dialog>
            )
        } else {
            return (
                <div>
                    <Dialog
                        actions={actions}
                        open={this.state.open}
                        autoScrollBodyContent={true}>
                        <Paper zDepth={2}>
                            <Divider/>
                            <TextField
                                hintText="Add your comment"
                                floatingLabelText="Your Comment"
                                onChange={(event, newValue) => {this.setState({newComment: newValue});
                                    console.log(newValue);
                                    newValue ? this.setState({submitDisabled: false}) : this.setState({submitDisabled: true})
                                }}
                                style={style}
                                underlineShow={false}
                            />
                            <br/>
                            <Divider/>
                        </Paper>
                        <ul>
                            {
                                this.state.commentList.reverse().map(item => {
                                    return (
                                        <div key={item.id}>
                                            <ListItem
                                                key={item.id}
                                                leftAvatar={<Avatar src={item.author.avatarImg}/>}
                                                secondaryText={
                                                    <p>
                                                        <span
                                                            style={{color: darkBlack}}>{item.author.username}</span> --
                                                        {item.content}
                                                    </p>
                                                }
                                                secondaryTextLines={2}
                                            />
                                            <Divider/>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </Dialog>
                </div>
            )
        }
    }
}
export default Comment;

const style = {
    marginRight: 20,
};
