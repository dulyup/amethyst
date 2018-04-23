import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: this.props.alert,
            text: this.props.text
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            alert: nextProps.alert,
            text: nextProps.text,})
    };

    handleClose = () => {
        this.setState({alert: false, text:''});
        this.props.clearAlert();
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        return (
            <div>
                <MuiThemeProvider>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.alert}
                        onRequestClose={this.handleClose}
                    >
                        {this.state.text}
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}