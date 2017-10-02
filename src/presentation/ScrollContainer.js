import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    scrollContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
});

class ScrollContainer extends React.Component {
    render() {
        const { classes, children, x, y } = this.props;

        return (
            <div className={ classes.root }>
                <div
                    className={ classes.scrollContainer }
                    style={{
                        overflowX: x ? 'auto' : 'none',
                        overflowY: y ? 'auto' : 'none'
                    }}
                >
                    { children }
                </div>
            </div>
        )
    }
}

ScrollContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    x: PropTypes.bool,
    y: PropTypes.bool
}

export default withStyles(styles)(ScrollContainer);