import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import Section from './Section.js';
import generator from './../generator';

const styles = theme => ({
    compileButton: {
        margin: theme.spacing.unit
    },
    dialogContent: {
        display: 'flex',
        'align-items': 'center'
    },
    progress: {
        margin: theme.spacing.unit,
        paddingRight: theme.spacing.unit
    }
});

class BuilderTabCompile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            compilingDialogOpen: false
        }

        this.handleCompile = this.handleCompile.bind(this);
    }

    handleCompile() {
        this.setState({ compilingDialogOpen: true }, () => {
            generator(this.props.kbcollection)
            .then((data) => {
                console.log(data)
                this.setState({ compilingDialogOpen: false });
            });
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Section>
                <Button
                    raised
                    color='primary'
                    onClick={ this.handleCompile }
                    className={ classes.compileButton }
                >
                    <FileDownloadIcon />
                    Compile .yaml
                </Button>
                <Dialog
                    fullWidth
                    open={ this.state.compilingDialogOpen }
                >
                    <DialogContent className={ classes.dialogContent }>
                        <CircularProgress className={ classes.progress } />
                        Compiling...
                    </DialogContent>
                </Dialog>
            </Section>
        );
    }
}

BuilderTabCompile.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    kbcollection: PropTypes.object.isRequired
}

export default withStyles(styles)(BuilderTabCompile);