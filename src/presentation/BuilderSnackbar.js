import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

class BuilderSnackbar extends React.Component {
    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={ this.props.open }
                autoHideDuration={ 6000 }
                onRequestClose={ this.props.onRequestClose }
                message={ <span id="message-id">{ this.props.message }</span> }
                action={[
                    <IconButton
                        key='close'
                        aria-label='close'
                        color='inherit'
                        onClick={ this.props.onRequestClose }
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        );
    }
}

BuilderSnackbar.propTypes = {
    // External props
    message: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

export default BuilderSnackbar;