import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { lightBlue } from 'material-ui/colors';
import BuilderAppBar from './ui/BuilderAppBar.js';
import BuilderDrawer from './ui/BuilderDrawer.js';
import BuilderMain from './ui/BuilderMain.js';
import BuilderKLEPasteDialog from './ui/BuilderKLEPasteDialog.js';
import BuilderLoadKBErrorSnackbar from './ui/BuilderLoadKBErrorSnackbar';
import ConfigLoader from './functions/ConfigLoader.js';
import KLELoader from './functions/KLELoader.js';

import 'typeface-roboto';

const theme = createMuiTheme({
    palette: {
        primary: lightBlue
    }
});

const styles = theme => ({
    app: {
        display: 'flex',
        'flex-flow': 'column',
        width: '100%',
        height: '100vh'
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawerOpen: false,
            isKLEPasteDialogOpen: false,
            keyboard: null,
            loadKBErrorMessage: ''
        }

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.loadKeyboard = this.loadKeyboard.bind(this);
        this.handleUseConfigUpload = this.handleUseConfigUpload.bind(this);
        this.handleUseClipboardKLE = this.handleUseClipboardKLE.bind(this);
        this.handleLoadKLE = this.handleLoadKLE.bind(this);
        this.handleLoadKBErrorSnackbarClose = this.handleLoadKBErrorSnackbarClose.bind(this);
    }

    // Sets the drawer open state to 'state' or toggle if not provided
    toggleDrawer(state) {
        this.setState({ isDrawerOpen: state || !this.state.isDrawerOpen });
    }
    
    loadKeyboard(loader) {
        loader.then((keyboard) => {
            this.setState({ 
                keyboard,
                isDrawerOpen: false
            });
        })
        .catch((err) => {
            this.setState({ loadKBErrorMessage: err });
        });
    }

    // Called when "Upload config" is selected in drawer
    handleUseConfigUpload() {
        this.loadKeyboard(ConfigLoader())
    }

    // Called when "Load KLE from clipboard" is selected in drawer
    handleUseClipboardKLE() {
        this.setState({
            isKLEPasteDialogOpen: true
        });
    }

    // Called when KLE dialog has returned data
    handleLoadKLE(layout) {
        this.loadKeyboard(KLELoader(layout));
        this.setState({ isKLEPasteDialogOpen: false });
    }

    // Called when error snackbar is closed
    handleLoadKBErrorSnackbarClose() {
        this.setState({ loadKBErrorMessage: '' });
    }

    render() {
        const classes = this.props.classes;

        return (
            <MuiThemeProvider theme={ theme }>
                <div className={ classes.app }>
                    <BuilderAppBar onRequestDrawerOpen={ () => this.toggleDrawer(true) } />
                    <BuilderDrawer 
                        open={ !this.state.keyboard || this.state.isDrawerOpen } 
                        onRequestClose={ () => this.toggleDrawer(false) }
                        onUseConfigUpload={ this.handleUseConfigUpload }  
                        onUseClipboardKLE={ this.handleUseClipboardKLE }
                    />
                    <BuilderMain />
                    <BuilderKLEPasteDialog
                        open={ this.state.isKLEPasteDialogOpen }
                        onChange={ this.handleLoadKLE }
                        onRequestClose={ () => this.setState({ isKLEPasteDialogOpen: false }) }
                    />
                    <BuilderLoadKBErrorSnackbar
                        open={ this.state.loadKBErrorMessage !== '' }
                        message={ this.state.loadKBErrorMessage }
                        onRequestClose={ this.handleLoadKBErrorSnackbarClose }
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App);