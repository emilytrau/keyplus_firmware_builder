import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
    title: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
});

class BuilderAppBar extends React.Component {
    render() {
        const classes = this.props.classes;

        return (
            <AppBar position='static'>
                <Toolbar>
                    <IconButton className={ classes.menuButton } color='contrast' aria-label='menu' onClick={ this.props.onRequestDrawerOpen }>
                        <MenuIcon />
                    </IconButton>
                    <Typography type='title' color='inherit' className={ classes.title }>
                        keyplus Firmware Builder
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

BuilderAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestDrawerOpen: PropTypes.func
}

export default withStyles(styles)(BuilderAppBar);
