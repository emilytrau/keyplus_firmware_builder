import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        padding: theme.spacing.unit
    },
    inner: {
        width: '100%'
    }
});

class BuilderTab extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <div className={ classes.root }>
                <Paper className={ classes.inner }>
                    { this.props.children }
                </Paper>
            </div>
        );
    }
}

BuilderTab.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node
}

export default withStyles(styles)(BuilderTab);