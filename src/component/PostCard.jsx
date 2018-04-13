import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';


//user, post, date

const PostCard = () => (
        <Card>
            <CardHeader
                title="Amy"
                subtitle="1st Mar"
                avatar="images/jsa-128.jpg"
            />
            {/*<img src="images/nature-600-337.jpg" alt="" />*/}
            <CardText>
                Hello World
            </CardText>
            <CardActions>
                <FlatButton label="Like"
                            icon={<FontIcon className="material-icons">favorite</FontIcon>}/>
                <FlatButton label="Comment" />
            </CardActions>
        </Card>
);

export default PostCard;