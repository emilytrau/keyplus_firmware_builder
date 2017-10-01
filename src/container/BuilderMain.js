import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openSidebarDrawer, closeSidebarDrawer, setKeyboard, setTab, openKLEPasteDialog, closeKLEPasteDialog } from './../actions/BuilderMain.js';
import { showSnackbar, updateKBCollection, addKeyboard, updateKeyboard } from './../actions/App.js';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import BuilderSidebarList from './../presentation/BuilderSidebarList.js';
import BuilderKLEPasteDialog from './../presentation/BuilderKLEPasteDialog';
import BuilderTabKeymap from './../presentation/BuilderTabKeymap.js';
import BuilderTabKBSettings from './../presentation/BuilderTabKBSettings.js';
import BuilderTabCollectionSettings from './../presentation/BuilderTabCollectionSettings.js';
import KLELoader from './../utils/KLELoader.js';
import ConfigSaver from './../utils/ConfigSaver.js';

const styles = theme => ({
    root: { 
        flex: 1,
        display: 'flex',
        'flex-flow': 'row'
    },
    sidebarPermanent: {
        height: '100%'
    },
    sidebarOpenButton: {
        position: 'fixed',
        bottom: 20,
        right: 20
    },
    sidebarDrawer: {
        width: 'auto'
    },
    content: {
        flex: 1
    }
});

const mapStateToProps = (state, ownProps) => ({
    kbcollection: state.app.kbcollection,
    selectedKeyboardIndex: state.main.selectedKeyboard,
    selectedTab: state.main.selectedTab,
    isSidebarDrawerOpen: state.main.isSidebarDrawerOpen,
    isKLEPasteDialogOpen: state.main.isKLEPasteDialogOpen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onRequestOpenSidebar: () => {
        dispatch(openSidebarDrawer());
    },
    onRequestCloseSidebar: () => {
        dispatch(closeSidebarDrawer());
    },
    onRequestSetKeybord: (index) => {
        dispatch(setKeyboard(index));
    },
    onRequestSetTab: (tab) => {
        dispatch(setTab(tab));
    },
    onRequestShowSnackbar: (message) => {
        dispatch(showSnackbar(message));
    },
    onRequestOpenKLEPasteDialog: () => {
        dispatch(openKLEPasteDialog());
    },
    onRequestCloseKLEPasteDialog: () => {
        dispatch(closeKLEPasteDialog());
    },
    onAddKeyboard: (keyboard) => {
        dispatch(addKeyboard(keyboard));
    },
    onUpdateKeyboard: (oldKeyboard, newKeyboard) => {
        dispatch(updateKeyboard(oldKeyboard, newKeyboard));
    },
    onUpdateKBCollection: (newCollection) => {
        dispatch(updateKBCollection(newCollection));
    }
});

class BuilderMain extends React.Component {
    constructor(props) {
        super(props);

        this.getSidebar = this.getSidebar.bind(this);
        this.getTab = this.getTab.bind(this);
        this.handleKLEPasteOnChange = this.handleKLEPasteOnChange.bind(this);
        this.handleSaveConfig = this.handleSaveConfig.bind(this);
    }

    getSidebar() {
        const { onRequestSetKeybord, onRequestSetTab, onRequestOpenKLEPasteDialog, selectedKeyboardIndex, selectedTab, kbcollection } = this.props;
        return (
            <BuilderSidebarList 
                onKeyboardSelect={ (index) => {
                    onRequestSetKeybord(index);
                    onRequestSetTab('keymap');
                } }
                onKeymapClick={ () => onRequestSetTab('keymap') }
                onMatrixClick={ () => onRequestSetTab('matrix') }
                onKBSettingsClick={ () => onRequestSetTab('kbsettings') }
                onAddKeyboardClick={ onRequestOpenKLEPasteDialog }
                onSaveConfigClick={ this.handleSaveConfig }
                onCompileClick={ () => onRequestSetTab('compile') }
                onCollectionSettingsClick={ () => onRequestSetTab('collectionsettings') }
                selectedKeyboard={ selectedKeyboardIndex }
                selectedTab={ selectedTab }
                keyboards={ kbcollection.keyboards }
            />
        );
    }

    getTab() {
        const selectedKeyboard = this.props.kbcollection.keyboards[this.props.selectedKeyboardIndex];
        const selectedTab = this.props.selectedTab;

        switch(selectedTab) {
            case 'keymap':
                return <BuilderTabKeymap
                    keyboard={ selectedKeyboard }
                />
            case 'kbsettings':
                return <BuilderTabKBSettings
                    keyboard={ selectedKeyboard }
                    onUpdateKeyboard={ (newKeyboard) => this.props.onUpdateKeyboard(selectedKeyboard, newKeyboard) }
                />
            case 'collectionsettings':
                return <BuilderTabCollectionSettings
                    kbcollection={ this.props.kbcollection }
                    onUpdateKBCollection={ this.props.onUpdateKBCollection }
                />
            default:
                return <div>{ selectedTab }</div>
        }
    }

    handleKLEPasteOnChange(layout) {
        KLELoader(layout)
        .then((collection) => {
            this.props.onAddKeyboard(collection.keyboards[0]);
        })
        .catch((err) => {
            this.props.onRequestShowSnackbar(err);
        });
        this.props.onRequestCloseKLEPasteDialog();
    }

    handleSaveConfig() {
        ConfigSaver(this.props.kbcollection);
    }

    render() {
        const classes = this.props.classes;

        return (
            <div className={ classes.root }>
                <div>
                    <Hidden smDown>
                        <Paper elevation={ 1 } className={ classes.sidebarPermanent } >
                            { this.getSidebar() }
                        </Paper>
                    </Hidden>
                    <Hidden mdUp>
                        <div>
                            <Button
                                fab
                                color='accent'
                                aria-label='sidebar'
                                onClick={ this.props.onRequestOpenSidebar }
                                className={ classes.sidebarOpenButton }
                            >
                                <ChevronRightIcon />
                            </Button>
                            <Drawer
                                anchor='right'
                                open={ this.props.isSidebarDrawerOpen }
                                onRequestClose={ this.props.onRequestCloseSidebar }
                            >
                                <div tabIndex={0} role="button" onClick={ this.props.onRequestCloseSidebar }>
                                    { this.getSidebar() }
                                </div>
                            </Drawer>
                        </div>
                    </Hidden>
                </div>
                <div className={ classes.content }>
                    { this.getTab() }
                </div>
                <BuilderKLEPasteDialog
                    open={ this.props.isKLEPasteDialogOpen }
                    onRequestClose={ this.props.onRequestCloseKLEPasteDialog }
                    onChange={ this.handleKLEPasteOnChange }
                />
            </div>
        );
    }
}

BuilderMain.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestOpenSidebar: PropTypes.func.isRequired,
    onRequestCloseSidebar: PropTypes.func.isRequired,
    onRequestSetKeybord: PropTypes.func.isRequired,
    onRequestSetTab: PropTypes.func.isRequired,
    onRequestShowSnackbar: PropTypes.func.isRequired,
    onRequestOpenKLEPasteDialog: PropTypes.func.isRequired,
    onRequestCloseKLEPasteDialog: PropTypes.func.isRequired,
    onAddKeyboard: PropTypes.func.isRequired,
    onUpdateKeyboard: PropTypes.func.isRequired,
    onUpdateKBCollection: PropTypes.func.isRequired,
    kbcollection: PropTypes.object.isRequired,
    selectedKeyboardIndex: PropTypes.number.isRequired,
    selectedTab: PropTypes.string.isRequired,
    isSidebarDrawerOpen: PropTypes.bool.isRequired,
    isKLEPasteDialogOpen: PropTypes.bool.isRequired
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BuilderMain));