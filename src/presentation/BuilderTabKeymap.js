import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import SearchIcon from 'material-ui-icons/Search';
import Section from './Section.js';
import BuilderKeyboard from './../container/BuilderKeyboard.js';
import { getCategoryNames, getCategory, searchKeycode, getLongLabel } from './../utils/Keycode.js';

const styles = theme => ({
    keyList: {
        display: 'flex',
        'flex-wrap': 'wrap',
        padding: theme.spacing.unit
    },
    chip: {
        margin: theme.spacing.unit / 2
    },
    selectedChip: {
        'background-color': theme.palette.secondary.A200
    },
    customKeycodeInput: {
        padding: theme.spacing.unit,
        '& > div': {
            marginRight: theme.spacing.unit
        }
    }
});

class BuilderTabKeymap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 1,
            searchTerm: ''
        }

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSetKeycode = this.handleSetKeycode.bind(this);
        this.renderTab = this.renderTab.bind(this);
        this.renderChips = this.renderChips.bind(this);
    }

    handleTabChange(newTab) {
        this.setState({ tab: newTab });
    }

    handleSearch(searchTerm) {
        this.setState({ searchTerm });
    }

    handleSetKeycode(keycode) {
        const { keyboard, selectedLayer, selectedKeyIndex } = this.props;
        const { row, column } = keyboard.layout[selectedKeyIndex];

        this.props.onUpdateKeyboard({
            ...keyboard,
            layers: keyboard.layers.map((layer, layerIndex) => {
                if (layerIndex === selectedLayer) {
                    return keyboard.layers[selectedLayer].map((rowData, rowIndex) => {
                        if (rowIndex === row) {
                            return keyboard.layers[selectedLayer][row].map((colData, colIndex) => {
                                if (colIndex === column) {
                                    return keycode;
                                }
                                return colData;
                            });
                        }
                        return rowData;
                    });
                }
                return layer;
            })
        });
    }

    renderTab() {
        const { classes, keyboard, selectedKeyIndex, selectedLayer } = this.props;
        const { row, column } = keyboard.layout[selectedKeyIndex];
        const keyValue = keyboard.layers[selectedLayer][row][column];
        const categories = getCategoryNames();
        
        // First tab - search
        if (this.state.tab === 0) {
            return (
                <div>
                    <TextField
                        fullWidth
                        placeholder='Search'
                        value={ this.state.searchTerm }
                        onChange={ (e) => this.handleSearch(e.target.value) }
                    />
                    {
                        this.renderChips(searchKeycode(this.state.searchTerm))
                    }
                </div>
            );
        }

        // Last tab - custom
        if (this.state.tab === categories.length + 1) {
            return (
                <div className={ classes.customKeycodeInput }>
                    <TextField
                        placeholder='Custom keycode'
                        defaultValue={ keyValue }
                        inputRef={ (ref) => this.customKeycodeInput = ref }
                    />
                    <Button
                        raised
                        onClick={ () => this.handleSetKeycode(this.customKeycodeInput.value) }
                    >
                        Update
                    </Button>
                </div>
            );
        }

        return (
            <div>
                {
                    getCategory(categories[this.state.tab - 1]).map((subcategory, index) => {
                        return (
                            <div key={ index }>
                                { this.renderChips(subcategory) }
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    renderChips(keycodes) {
        const { classes, keyboard, selectedKeyIndex, selectedLayer } = this.props;
        const { row, column } = keyboard.layout[selectedKeyIndex];
        const keyValue = keyboard.layers[selectedLayer][row][column];

        return (
            <div className={ classes.keyList }>
                {
                    keycodes.map((keycode, index) => {
                        return (
                            <Chip
                                label={ getLongLabel(keycode) }
                                onClick={ () => this.handleSetKeycode(keycode) }
                                className={ classes.chip + (keycode === keyValue ? ' ' + classes.selectedChip : '') }
                                key={ index }
                            />
                        );
                    }, this)
                }
            </div>
        );
    }

    render() {
        const { classes, keyboard, selectedKeyIndex } = this.props;
        const disabled = selectedKeyIndex === -1;

        return (
            <div>
                <Section>
                    <BuilderKeyboard keymap />
                </Section>
                <Section>
                    <AppBar
                        position='static'
                        color='default'
                    >
                        <Tabs
                            fullWidth
                            scrollable
                            value={ this.state.tab }
                            onChange={ (e, value) => this.handleTabChange(value) }
                        >
                            <Tab
                                icon={ <SearchIcon /> }
                                disabled={ disabled }
                            />
                            {
                                getCategoryNames().map((categoryName, index) => {
                                    return (
                                        <Tab
                                            disabled={ disabled }
                                            label={ categoryName }
                                            key={ index }
                                        />
                                    );
                                })
                            }
                            <Tab
                                disabled={ disabled }
                                label='Custom'
                            />
                        </Tabs>
                    </AppBar>
                    { !disabled ? this.renderTab() : null }
                </Section>
            </div>
        );
    }
}

BuilderTabKeymap.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    keyboard: PropTypes.object.isRequired,
    selectedKeyIndex: PropTypes.number.isRequired,
    selectedLayer: PropTypes.number.isRequired,
    onUpdateKeyboard: PropTypes.func.isRequired
}

export default withStyles(styles)(BuilderTabKeymap);