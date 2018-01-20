import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openSidebarDrawer, closeSidebarDrawer, setKeyboard, setTab, openKLEPasteDialog, closeKLEPasteDialog } from './../actions/BuilderMain.js';
import { showSnackbar, updateKBCollection, addKeyboard, updateKeyboard, updateKey } from './../actions/App.js';
import { selectKey } from './../actions/BuilderKeyboard.js';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import ScrollContainer from './../presentation/ScrollContainer.js'
import BuilderSidebarList from './../presentation/BuilderSidebarList.js';
import BuilderKLEPasteDialog from './../presentation/BuilderKLEPasteDialog';
import BuilderTabKeymap from './../presentation/BuilderTabKeymap.js';
import BuilderTabMatrix from './../presentation/BuilderTabMatrix.js';
import BuilderTabKBSettings from './../presentation/BuilderTabKBSettings.js';
import BuilderTabCollectionSettings from './../presentation/BuilderTabCollectionSettings.js';
import BuilderTabCompile from './../presentation/BuilderTabCompile.js';
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
        right: 20,
        'z-index': 5
    },
    content: {
        flex: 1
    }
});

const mapStateToProps = (state, ownProps) => ({
    kbcollection: state.app.kbcollection,
    selectedKeyboardIndex: state.main.selectedKeyboard,
    selectedTab: state.main.selectedTab,
    selectedKeyIndex: state.keyboard.selectedKeyIndex,
    selectedLayer: state.keyboard.layer,
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
        dispatch(selectKey(-1));
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
    onUpdateKeyboard: (index, newKeyboard) => {
        dispatch(updateKeyboard(index, newKeyboard));
    },
    onUpdateKBCollection: (newCollection) => {
        dispatch(updateKBCollection(newCollection));
    },
    onUpdateKey: (keyboardIndex, index, newKey) => {
        dispatch(updateKey(keyboardIndex, index, newKey));
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
        const { kbcollection, selectedTab, selectedKeyboardIndex, selectedKeyIndex, selectedLayer, onUpdateKBCollection, onUpdateKeyboard, onUpdateKey } = this.props;
        const selectedKeyboard = kbcollection.keyboards[selectedKeyboardIndex];

        switch(selectedTab) {
            case 'keymap':
                return <BuilderTabKeymap
                    keyboard={ selectedKeyboard }
                    selectedKeyIndex={ selectedKeyIndex }
                    selectedLayer={ selectedLayer }
                    onUpdateKeyboard={ (newKeyboard) => onUpdateKeyboard(selectedKeyboardIndex, newKeyboard) }
                />
            case 'matrix':
                return <BuilderTabMatrix
                    keyboard={ selectedKeyboard }
                    selectedKeyIndex={ selectedKeyIndex }
                    onUpdateKey={ (index, newKey) => onUpdateKey(selectedKeyboardIndex, index, newKey) }
                />
            case 'kbsettings':
                return <BuilderTabKBSettings
                    keyboard={ selectedKeyboard }
                    onUpdateKeyboard={ (newKeyboard) => onUpdateKeyboard(selectedKeyboardIndex, newKeyboard) }
                />
            case 'collectionsettings':
                return <BuilderTabCollectionSettings
                    kbcollection={ kbcollection }
                    onUpdateKBCollection={ onUpdateKBCollection }
                />
            case 'compile':
                return <BuilderTabCompile
                    kbcollection={ kbcollection }
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
                                { this.getSidebar() }
                            </Drawer>
                        </div>
                    </Hidden>
                </div>
                <div className={ classes.content }>
                    <ScrollContainer y>
                        { this.getTab() }
                    </ScrollContainer>
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
    onUpdateKey: PropTypes.func.isRequired,
    kbcollection: PropTypes.object.isRequired,
    selectedKeyboardIndex: PropTypes.number.isRequired,
    selectedTab: PropTypes.string.isRequired,
    selectedLayer: PropTypes.number.isRequired,
    isSidebarDrawerOpen: PropTypes.bool.isRequired,
    isKLEPasteDialogOpen: PropTypes.bool.isRequired
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BuilderMain));