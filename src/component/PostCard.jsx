import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import Checkbox from 'material-ui/Checkbox';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import '../css/postCard.css';
import Comment from './Comment';
const img = 'http://experimentexchange.com/wp-content/uploads/2016/07/penguin-baby.jpg';

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

    updateCheck() {
        this.setState((oldState) => {
            return {
                checked: !oldState.checked,
            };
        });
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    render() {
        console.log(this.state.commentIdList);
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
                    {/*<FlatButton label={`Like ${this.state.like}`} />*/}
                    <FlatButton label="Comment " onClick={this.handleOpen}/>
                    <Comment open={this.state.open}
                             commentIdList={this.state.commentIdList}
                             postId={this.state.postId}
                             updateCommentIdList={this.props.updateCommentIdList}/>
                    <Checkbox className={'like-button'}
                              checkedIcon={<ActionFavorite />}
                              uncheckedIcon={<ActionFavoriteBorder />}
                              // label={`${this.state.like}`}
                              style={styles.checkbox}
                    />
                </CardActions>

            </Card>
        );
    }
}

export default PostCard;

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};