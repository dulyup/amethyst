import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import '../css/homepage.css';

class postNewWindow extends Component {
    state = {
        open: false,
        content: '',
        image: '',
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit =() => {
        const post = {
            content: this.state.content,
            image: this.state.image
        };
        this.setState({open: false});
        this.props.onSubmitClicked(post);
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={false}
                onClick={this.handleSubmit}
            />,
        ];

        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <FloatingActionButton className={'post-new'} style={style} onClick={this.handleOpen}>
                            <ContentAdd />
                        </FloatingActionButton>
                        <Dialog
                            title="New Post"
                            actions={actions}
                            modal={true}
                            open={this.state.open}
                        >
                            <Paper zDepth={2}>
                                <Divider/>
                                <TextField
                                    hintText="Enter Your Sharing"
                                    floatingLabelText="Your Sharing"
                                    onChange={(event, newValue) => this.setState({content: newValue})}
                                    style={style}
                                    underlineShow={false}
                                />
                                <br/>
                                <Divider/>
                                <TextField
                                    hintText="Enter Url of Your Picture"
                                    floatingLabelText="Upload Picture"
                                    onChange={(event, newValue) => this.setState({image: newValue})}
                                    style={style}
                                    underlineShow={false}
                                />
                            </Paper>

                        </Dialog>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    marginRight: 20,
};
export default postNewWindow;