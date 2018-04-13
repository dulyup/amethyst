import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class PostField extends React.Component {
    state = {
        open: false,
        post: '',
        picture: ''
    };

    render() {
        return (
            <Paper zDepth={2}>
                <Divider/>
                <TextField
                    hintText="Enter Your Sharing"
                    floatingLabelText="Your Sharing"
                    onChange={(event, newValue) => this.setState({post: newValue})}
                    style={style}
                    underlineShow={false}
                />
                <br/>
                <Divider/>
                <TextField
                    hintText="Enter Url of Your Picture"
                    floatingLabelText="Upload Picture"
                    onChange={(event, newValue) => this.setState({picture: newValue})}
                    style={style}
                    underlineShow={false}
                />
                <Divider/>
            </Paper>
        )
    }
}

const style = {
    marginLeft: 20,
};

export default PostField;