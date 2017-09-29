import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';

class BuilderKLEPasteDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleOk() {
        this.props.onChange(this.state.value);
    }

    render() {
        return (
            <Dialog
                open={ this.props.open }
                onRequestClose={ this.props.onRequestClose }
            >
                <DialogTitle>Paste KLE Raw Data</DialogTitle>
                <DialogContent>
                    <Input
                        placeholder='Layout' 
                        value={ this.state.value } 
                        onChange={ this.handleChange } 
                        fullWidth 
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={ this.handleOk }>Ok</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

BuilderKLEPasteDialog.propTypes = {
    onChange: PropTypes.func,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool
}

export default BuilderKLEPasteDialog;