import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FileUploadIcon from 'material-ui-icons/FileUpload';
import ContentPasteIcon from 'material-ui-icons/ContentPaste';
import GitHubSvgIcon from './../resources/GitHubSvgIcon.js';
import KeyplusSvgIcon from './../resources/KeyplusSvgIcon.js';

const styles = theme => ({
    root: {
        width: '100%'
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    drawerList: {
        width: 250,
        flex: 'initial'
    }
});

class BuilderAppBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawerOpen: false
        }

        this.toggle = this.toggleDrawer.bind(this);
        this.useConfig = this.useConfig.bind(this);
        this.useKLE = this.useKLE.bind(this);
    }

    // Sets the drawer open state to 'state' or toggle if not provided
    toggleDrawer(state) {
        this.setState({ isDrawerOpen: state || !this.state.isDrawerOpen });
    }

    // Load existing config
    useConfig() {

    }

    // Load new config from KLE layout
    useKLE() {

    }

    render() {
        const classes = this.props.classes;

        return (
            <div className={ classes.root }>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton className={ classes.menuButton } color='contrast' aria-label='menu' onClick={ () => this.toggleDrawer(true) }>
                            <MenuIcon />
                        </IconButton>
                        <Typography type='title' color='inherit' className={ classes.flex }>
                            keyplus Firmware Builder
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer open={ this.state.isDrawerOpen } onRequestClose={ () => this.toggleDrawer(false) }>
                    <div tabIndex={ 0 } role='button' onClick={ () => this.toggleDrawer(false) }>
                        <div>
                            <List className={ classes.drawerList }>
                                <ListItem button onClick={ this.useConfig }>
                                    <ListItemIcon>
                                        <FileUploadIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Upload config' />
                                </ListItem>
                                <ListItem button onClick={ this.useKLE }>
                                    <ListItemIcon>
                                        <ContentPasteIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Upload KLE from clipboard' />
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem button component='a' href='https://github.com/angustrau/keyplus_firmware_builder'>
                                    <GitHubSvgIcon />
                                    <ListItemText primary='Contribute on GitHub' />
                                </ListItem>
                                <ListItem button component='a' href='https://github.com/ahtn/keyplus'>
                                    <KeyplusSvgIcon />
                                    <ListItemText primary='keyplus Firmware' />
                                </ListItem>
                            </List>
                        </div>
                    </div>
                </Drawer>
            </div>
        );
    }
}

BuilderAppBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BuilderAppBar);
