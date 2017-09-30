import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Divider from 'material-ui/Divider';
import KeyboardIcon from 'material-ui-icons/Keyboard';
import GridOnIcon from 'material-ui-icons/GridOn';
import SettingsIcon from 'material-ui-icons/Settings';
import AddIcon from 'material-ui-icons/Add';
import SaveIcon from 'material-ui-icons/Save'
import ArchiveIcon from 'material-ui-icons/Archive';

const styles = theme => ({
    root: {
        width: 200,
        height: '100%'
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4
    },
    selected: {
        color: theme.palette.primary[500]
    }
});

class BuilderSidebarList extends React.Component {
    render() {
        const classes = this.props.classes;

        return (
            <div className={ classes.root }>
                <List>
                    {
                        [].concat(...this.props.keyboards.map((keyboard, index) => {
                            return (
                                [
                                    <ListItem 
                                        button 
                                        onClick={ () => this.props.onKeyboardSelect(index) } 
                                        key={ index * 2 }
                                    >
                                        <ListItemText primary={ keyboard.name } />
                                        { this.props.selectedKeyboard === index ? <ExpandLess /> : <ExpandMore /> }
                                    </ListItem>,
                                    <Collapse 
                                        in={ this.props.selectedKeyboard === index } 
                                        transitionDuration='auto' 
                                        unmountOnExit
                                        key={ index * 2 + 1 }
                                    >
                                        <ListItem
                                            button
                                            onClick={ this.props.onKeymapClick }
                                            className={ classes.nested }
                                        >
                                            <ListItemIcon classes={{ root: this.props.selectedTab === 'keymap' ? classes.selected : undefined }}>
                                                <KeyboardIcon />
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary='Keymap'
                                                classes={{ text: this.props.selectedTab === 'keymap' ? classes.selected : undefined }}
                                            />
                                        </ListItem>
                                        <ListItem
                                            button
                                            onClick={ this.props.onMatrixClick }
                                            className={ classes.nested }
                                        >
                                            <ListItemIcon classes={{ root: this.props.selectedTab === 'matrix' ? classes.selected : undefined }}>
                                                <GridOnIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary='Matrix'
                                                classes={{ text: this.props.selectedTab === 'matrix' ? classes.selected : undefined }}
                                            />
                                        </ListItem>
                                        <ListItem
                                            button
                                            onClick={ this.props.onKBSettingsClick }
                                            className={ classes.nested }
                                        >
                                            <ListItemIcon classes={{ root: this.props.selectedTab === 'kbsettings' ? classes.selected : undefined }}>
                                                <SettingsIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary='Settings'
                                                classes={{ text: this.props.selectedTab === 'kbsettings' ? classes.selected : undefined }}
                                            />
                                        </ListItem>
                                    </Collapse>
                                ]
                            );
                        }))
                    }
                    <ListItem button onClick={ this.props.onAddKeyboardClick }>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary='Add keyboard' />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={ this.props.onCollectionSettingsClick }>
                        <ListItemIcon classes={{ root: this.props.selectedTab === 'collectionsettings' ? classes.selected : undefined }}>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary='Collection settings'
                            classes={{ text: this.props.selectedTab === 'collectionsettings' ? classes.selected : undefined }}
                        />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={ this.props.onSaveConfigClick }>
                        <ListItemIcon>
                            <SaveIcon />
                        </ListItemIcon>
                        <ListItemText primary='Save config' />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ArchiveIcon />
                        </ListItemIcon>
                        <ListItemText primary='Compile' />
                    </ListItem>
                </List>
            </div>
        );
    }
}

BuilderSidebarList.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    onKeyboardSelect: PropTypes.func.isRequired,
    onKeymapClick: PropTypes.func.isRequired,
    onMatrixClick: PropTypes.func.isRequired,
    onKBSettingsClick: PropTypes.func.isRequired,
    onAddKeyboardClick: PropTypes.func.isRequired,
    onSaveConfigClick: PropTypes.func.isRequired,
    onCollectionSettingsClick: PropTypes.func.isRequired,
    selectedKeyboard: PropTypes.number.isRequired,
    selectedTab: PropTypes.string.isRequired,
    keyboards: PropTypes.array.isRequired
}

export default withStyles(styles)(BuilderSidebarList);