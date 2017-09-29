import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { lightBlue } from 'material-ui/colors';
import BuilderAppBar from './ui/BuilderAppBar.js';
import BuilderDrawer from './ui/BuilderDrawer.js';
import BuilderMain from './ui/BuilderMain.js';
import BuilderKLEPasteDialog from './ui/BuilderKLEPasteDialog.js';

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
            keyboard: null
        }

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.handleUseConfigUpload = this.handleUseConfigUpload.bind(this);
        this.handleUseClipboardKLE = this.handleUseClipboardKLE.bind(this);
        this.handleLoadKLE = this.handleLoadKLE.bind(this);
    }

    // Sets the drawer open state to 'state' or toggle if not provided
    toggleDrawer(state) {
        this.setState({ isDrawerOpen: state || !this.state.isDrawerOpen });
    }

    handleUseConfigUpload() {

    }

    handleUseClipboardKLE() {
        this.setState({
            isDrawerOpen: false,
            isKLEPasteDialogOpen: true
        });
    }

    handleLoadKLE(layout) {
        console.log(layout);
        this.setState({ isKLEPasteDialogOpen: false });
    }

    render() {
        const classes = this.props.classes;

        return (
            <MuiThemeProvider theme={ theme }>
                <div className={ classes.app }>
                    <BuilderAppBar onRequestDrawerOpen={ () => this.toggleDrawer(true) } />
                    <BuilderDrawer 
                        open={ this.state.isDrawerOpen } 
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
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App);