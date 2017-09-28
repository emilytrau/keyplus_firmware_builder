import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import KeyboardIcon from 'material-ui-icons/Keyboard';
import GridOnIcon from 'material-ui-icons/GridOn';
import ArchiveIcon from 'material-ui-icons/Archive';

const styles = theme => ({
    root: { 
        flex: 1,
        display: 'flex',
        'flex-flow': 'column'
    },
    tabsRoot: {
        
    },
    tabContent: {
        flex: 1
    }
});

class BuilderMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabValue: 0
        }

        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(event, value) {
        this.setState({ tabValue: value });
    }

    render() {
        const classes = this.props.classes;

        return (
            <div className={ classes.root }>
                <div className={ classes.tabContent }>
                    
                </div>
                <Paper className={ classes.tabsRoot }>
                    <Tabs
                        value={ this.state.tabValue }
                        onChange={ this.changeTab }
                        indicatorColor='primary'
                        textColor='primary'
                        centered  
                    >
                        <Tab label='Keymap' icon={ <KeyboardIcon />} />
                        <Tab label='Matrix' icon={ <GridOnIcon /> } />
                        <Tab label='Compile' icon={ <ArchiveIcon /> } />
                    </Tabs>
                </Paper>
            </div>
        );
    }
}

BuilderMain.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BuilderMain);