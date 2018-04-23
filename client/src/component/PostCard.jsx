import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import '../css/postCard.css';
import Comment from './Comment';

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
            author: this.props.author,
            date: this.props.date,
            content: this.props.content,
            avatarImg: this.props.avatarImg,
            image: this.props.image,
            like: this.props.like,
            commentIdList: this.props.commentIdList,
            open: false,
            checked: false,
            update: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: false,
            content: nextProps.content,
            image: nextProps.image,
            commentIdList: nextProps.commentIdList
        });
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    render() {
        return (
            <Card className={'post-card'}>

                <CardHeader className={'post-header'}
                    title={this.state.author}
                    subtitle={this.state.date}
                    avatar={this.state.avatarImg}
                />

                <CardMedia className={'post-image'}>
                    <img src={this.state.image} alt="" />
                </CardMedia>

                <CardText>
                    {this.state.content}
                </CardText>

                <CardActions>
                    <FlatButton label="Comment " onClick={this.handleOpen}/>
                    <Comment key={this.state.postId}
                             open={this.state.open}
                             commentIdList={this.state.commentIdList}
                             postId={this.state.postId}
                             updateCommentIdList={this.props.updateCommentIdList}/>
                    {/*<Checkbox className={'like-button'}*/}
                              {/*checkedIcon={<ActionFavorite />}*/}
                              {/*uncheckedIcon={<ActionFavoriteBorder />}*/}
                              {/*style={styles.checkbox}*/}
                    {/*/>*/}
                </CardActions>

            </Card>
        );
    }

    // updateCheck() {
    //     this.setState((oldState) => {
    //         return {
    //             checked: !oldState.checked,
    //         };
    //     });
    // }
}

export default PostCard;
