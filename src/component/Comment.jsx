import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Common extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            comment: this.props.comment
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.open });
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <Dialog
                    actions={actions}
                    open={this.state.open}>
                    <List>
                        <ListItem
                            leftAvatar={<Avatar src="images/ok-128.jpg" />}
                            primaryText="Brunch this weekend?"
                            secondaryText={
                                <p>
                                    <span style={{color: darkBlack}}>Brendan Lim</span> --
                                    I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                                </p>
                            }
                            secondaryTextLines={2}
                        />
                        <Divider inset={true} />
                    </List>
                </Dialog>
            </div>
        )
    }
}


export default Common;