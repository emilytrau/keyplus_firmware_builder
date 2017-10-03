import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Section from './Section.js';
import BuilderKeyboard from './../container/BuilderKeyboard.js';

const styles = theme => ({
    controlsContainer: {
        display: 'flex',
        'justify-content': 'center'
    },
    controls: {
        minWidth: 275
    }
});

class BuilderTabKeymap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 0
        }

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(newTab) {
        this.setState({ tab: newTab });
    }

    render() {
        const { classes, keyboard } = this.props;

        return (
            <div>
                <Section>
                    <BuilderKeyboard keymap />
                </Section>
                <div className={ classes.controlsContainer }>
                    <Card className={ classes.controls }>
                        <CardContent>
                            <Tabs
                                fullWidth
                                value={ this.state.tab }
                                onChange={ (e) => this.handleTabChange(e.target.value) }
                            >
                                
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

BuilderTabKeymap.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    keyboard: PropTypes.object.isRequired
}

export default withStyles(styles)(BuilderTabKeymap);