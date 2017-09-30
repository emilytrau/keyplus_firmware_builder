import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openDrawer, closeDrawer, openKLEPasteDialog, closeKLEPasteDialog, setKBCollection, showSnackbar } from './actions/App.js';
import { withStyles } from 'material-ui/styles';
import BuilderAppBar from './presentation/BuilderAppBar.js';
import BuilderDrawer from './presentation/BuilderDrawer.js';
import BuilderMain from './container/BuilderMain.js';
import BuilderKLEPasteDialog from './presentation/BuilderKLEPasteDialog.js';
import BuilderSnackbar from './presentation/BuilderSnackbar.js';
import ConfigLoader from './utils/ConfigLoader.js';
import KLELoader from './utils/KLELoader.js';

const styles = theme => ({
    app: {
        display: 'flex',
        'flex-flow': 'column',
        width: '100%',
        height: '100vh'
    }
});

const mapStateToProps = (state, ownProps) => ({
    kbcollection: state.app.kbcollection,
    isDrawerOpen: state.app.isDrawerOpen,
    isKLEPasteDialogOpen: state.app.isKLEPasteDialogOpen,
    snackbarMessage: state.app.snackbarMessage
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onRequestDrawerOpen: () => {
        dispatch(openDrawer());
    },
    onRequestDrawerClose: () => {
        dispatch(closeDrawer());
    },
    onRequestKLEPasteDialogOpen: () => {
        dispatch(openKLEPasteDialog());
    },
    onRequestKLEPasteDialogClose: () => {
        dispatch(closeKLEPasteDialog());
    },
    onSetKBCollection: (kbcollection) => {
        dispatch(setKBCollection(kbcollection));
    },
    onShowSnackbarMessage: (message) => {
        dispatch(showSnackbar(message));
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.loadKeyboard = this.loadKeyboard.bind(this);
        this.handleUseConfigUpload = this.handleUseConfigUpload.bind(this);
        this.handleLoadKLE = this.handleLoadKLE.bind(this);
    }
    
    loadKeyboard(promise) {
        promise.then((kbcollection) => {
            this.props.onSetKBCollection(kbcollection);
            this.props.onRequestDrawerClose();
        })
        .catch((err) => {
            this.props.onShowSnackbarMessage(err);
        });
    }

    // Called when "Upload config" is selected in drawer
    handleUseConfigUpload() {
        this.loadKeyboard(ConfigLoader())
    }

    // Called when KLE dialog has returned data
    handleLoadKLE(layout) {
        this.loadKeyboard(KLELoader(layout));
        this.props.onRequestKLEPasteDialogClose();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={ classes.app }>
                <BuilderAppBar onRequestDrawerOpen={ this.props.onRequestDrawerOpen } />
                <BuilderDrawer 
                    open={ this.props.isDrawerOpen || !this.props.kbcollection }
                    onUseConfigUpload={ this.handleUseConfigUpload }
                    onUseClipboardKLE={ this.props.onRequestKLEPasteDialogOpen }
                    onRequestClose={ this.props.onRequestDrawerClose }
                />
                { this.props.kbcollection ? <BuilderMain /> : <div /> }
                <BuilderKLEPasteDialog
                    open={ this.props.isKLEPasteDialogOpen }
                    onChange={ this.handleLoadKLE }
                    onRequestClose={ this.props.onRequestKLEPasteDialogClose }
                />
                <BuilderSnackbar
                    open={ this.props.snackbarMessage !== '' }
                    message={ this.props.snackbarMessage }
                    onRequestClose={ () => this.props.onShowSnackbarMessage('') }
                />
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestDrawerClose: PropTypes.func.isRequired,
    onRequestDrawerOpen: PropTypes.func.isRequired,
    onRequestKLEPasteDialogClose: PropTypes.func.isRequired,
    onRequestKLEPasteDialogOpen: PropTypes.func.isRequired,
    onSetKBCollection: PropTypes.func.isRequired,
    onShowSnackbarMessage: PropTypes.func.isRequired,
    kbcollection: PropTypes.object.isRequired,
    isDrawerOpen: PropTypes.bool.isRequired,
    isKLEPasteDialogOpen: PropTypes.bool.isRequired,
    snackbarMessage: PropTypes.string.isRequired
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));