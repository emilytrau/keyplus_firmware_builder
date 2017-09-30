import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const styles = theme => ({
    selected: {
        color: theme.palette.primary[500]
    }
});

class ListItemSelectable extends React.Component {
    render() {
        const { classes, onClick, selected, icon, primary, ...props } = this.props;

        return (
            <ListItem 
                { ...props }
                button
                onClick={ onClick }
            >
                { icon ?
                    <ListItemIcon 
                        classes={{ root: selected ? classes.selected : undefined }}
                    >
                        { icon }
                    </ListItemIcon>
                    : null
                }
                <ListItemText 
                    primary={ primary }
                    classes={{ text: selected ? classes.selected : undefined }}
                />
            </ListItem>
        );
    }
}

ListItemSelectable.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    icon: PropTypes.element,
    primary: PropTypes.string
}

export default withStyles(styles)(ListItemSelectable);