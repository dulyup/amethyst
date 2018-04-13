import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PostField from './PostField';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class postModalWindow extends React.Component {
    state = {
        open: false,
        post: '',

    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
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
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Post New" onClick={this.handleOpen} />
                <Dialog
                    title="New Post"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <PostField />

                </Dialog>

            </div>
        );
    }
}

export default postModalWindow;