import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import Checkbox from 'material-ui/Checkbox';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import '../css/postCard.css';
import Comment from './Comment';
const img = 'http://experimentexchange.com/wp-content/uploads/2016/07/penguin-baby.jpg';


const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

//user, content, date
class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: this.props.author,
            date: this.props.date,
            content: this.props.content,
            avatarImg: this.props.avatarImg,
            image: this.props.image,
            like: this.props.like,
            checked: false,
            comment: this.props.comment,
            open: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            content: nextProps.content,
            image: nextProps.image });
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
        console.log(this.state.open);
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

                    <FlatButton label={`Like ${this.state.like}`} />
                    <FlatButton label="Comment " onClick={this.handleOpen}/>
                    <Comment open={this.state.open} comment={this.state.comment}/>
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