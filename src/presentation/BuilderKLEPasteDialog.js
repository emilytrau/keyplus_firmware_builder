import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';

class BuilderKLEPasteDialog extends React.Component {
    render() {
        return (
            <Dialog
                open={ this.props.open }
                onRequestClose={ this.props.onRequestClose }
                onEntering={ () => this.textbox.focus() }
            >
                <DialogTitle>Paste KLE Raw Data</DialogTitle>
                <DialogContent>
                    <Input
                        placeholder='Layout' 
                        fullWidth
                        inputRef={ (input) => { this.textbox = input } }
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={ this.props.onRequestClose }>Cancel</Button>
                    <Button color='primary' onClick={ () => {
                        this.props.onChange(this.textbox.value);
                        this.textbox.value = ''
                    } }>Ok</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

BuilderKLEPasteDialog.propTypes = {
    // External props
    onChange: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

export default BuilderKLEPasteDialog