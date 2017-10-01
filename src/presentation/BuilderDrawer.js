import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FileUploadIcon from 'material-ui-icons/FileUpload';
import AddIcon from 'material-ui-icons/Add';
import GitHubSvgIcon from './../resources/GitHubSvgIcon.js';
import KeyplusSvgIcon from './../resources/KeyplusSvgIcon.js';

const styles = theme => ({
    drawerList: {
        width: 250,
        flex: 'initial'
    }
});

class BuilderDrawer extends React.Component {
    render() {
        const classes = this.props.classes;

        return (
            <Drawer open={ this.props.open } onRequestClose={ this.props.onRequestClose }>
                <div tabIndex={ 0 } role='button' onClick={ () => this.props.onRequestClose }>
                    <div>
                        <List className={ classes.drawerList }>
                            <ListItem button onClick={ this.props.onUseConfigUpload }>
                                <ListItemIcon>
                                    <FileUploadIcon />
                                </ListItemIcon>
                                <ListItemText primary='Upload config' />
                            </ListItem>
                            <ListItem button onClick={ this.props.onUseClipboardKLE }>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary='New collection' />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button component='a' href='https://github.com/angustrau/keyplus_firmware_builder'>
                                <ListItemIcon>
                                    <GitHubSvgIcon />
                                </ListItemIcon>
                                <ListItemText primary='Contribute on GitHub' />
                            </ListItem>
                            <ListItem button component='a' href='https://github.com/ahtn/keyplus'>
                                <ListItemIcon>
                                    <KeyplusSvgIcon />
                                </ListItemIcon>
                                <ListItemText primary='keyplus Firmware' />
                            </ListItem>
                        </List>
                    </div>
                </div>
            </Drawer>
        );
    }
}

BuilderDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    onRequestClose: PropTypes.func.isRequired,
    onUseClipboardKLE: PropTypes.func.isRequired,
    onUseConfigUpload: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

export default withStyles(styles)(BuilderDrawer);