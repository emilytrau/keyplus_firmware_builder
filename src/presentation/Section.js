import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        boxSizing: 'border-box',
        padding: theme.spacing.unit
    },
    inner: {
        width: '100%'
    }
});

class Section extends React.Component {
    render() {
        const { classes, children, ...other } = this.props;
        return (
            <div className={ classes.root }>
                <Paper className={ classes.inner } { ...other }>
                    { children }
                </Paper>
            </div>
        );
    }
}

Section.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node
}

export default withStyles(styles)(Section);