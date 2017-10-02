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
import ListItemSelectable from './ListItemSelectable.js';
import ScrollContainer from './ScrollContainer.js';

const styles = theme => ({
    root: {
        width: 200,
        height: '100%'
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4
    }
});

class BuilderSidebarList extends React.Component {
    render() {
        const classes = this.props.classes;

        return (
            <div className={ classes.root }>
                <ScrollContainer y>
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
                                            <ListItemSelectable
                                                onClick={ this.props.onKeymapClick }
                                                icon={ <KeyboardIcon /> }
                                                primary='Keymap'
                                                selected={ this.props.selectedTab === 'keymap' }
                                                className={ classes.nested }
                                            />
                                            <ListItemSelectable
                                                onClick={ this.props.onMatrixClick }
                                                icon={ <GridOnIcon /> }
                                                primary='Matrix'
                                                selected={ this.props.selectedTab === 'matrix' }
                                                className={ classes.nested }
                                            />
                                            <ListItemSelectable
                                                onClick={ this.props.onKBSettingsClick }
                                                icon={ <SettingsIcon /> }
                                                primary='Settings'
                                                selected={ this.props.selectedTab === 'kbsettings' }
                                                className={ classes.nested }
                                            />
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
                        <ListItemSelectable
                            onClick={ this.props.onCollectionSettingsClick }
                            icon={ <SettingsIcon /> }
                            primary='Collection settings'
                            selected={ this.props.selectedTab === 'collectionsettings' }
                        />
                        <ListItemSelectable
                            onClick={ this.props.onCompileClick }
                            icon={ <ArchiveIcon /> }
                            primary='Compile'
                            selected={ this.props.selectedTab === 'compile' }
                        />
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={ this.props.onSaveConfigClick }>
                            <ListItemIcon>
                                <SaveIcon />
                            </ListItemIcon>
                            <ListItemText primary='Save config' />
                        </ListItem>
                    </List>
                </ScrollContainer>
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
    onCompileClick: PropTypes.func.isRequired,
    onCollectionSettingsClick: PropTypes.func.isRequired,
    selectedKeyboard: PropTypes.number.isRequired,
    selectedTab: PropTypes.string.isRequired,
    keyboards: PropTypes.array.isRequired
}

export default withStyles(styles)(BuilderSidebarList);