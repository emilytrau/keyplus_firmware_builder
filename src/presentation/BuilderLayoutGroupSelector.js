import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = theme => ({
    addGroup: {
        display: 'flex',
        'justify-content': 'flex-end',
        padding: theme.spacing.unit
    }
});

class BuilderLayoutGroupSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        }

        this.addGroup = this.addGroup.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.renderBody = this.renderBody.bind(this);
    }

    addGroup() {
        const { onChange, value } = this.props;
        onChange([
            ...value,
            []
        ]);
    }

    updateGroup(newValue, index) {
        if (newValue[0] === null) return;
        
        const { onChange, value } = this.props;
        onChange([
            ...value.slice(0, index),
            newValue,
            ...value.slice(index + 1)
        ]);
    }

    removeGroup(index) {
        const { onChange, value } = this.props;
        onChange([
            ...value.slice(0, index),
            ...value.slice(index + 1)
        ]);
    }

    renderBody() {
        const { keyboards, value } = this.props;
        if (value.length === 0) {
            return (
                <TableRow>
                    <TableCell numeric>-</TableCell>
                    <TableCell>
                        <Select
                            fullWidth
                            value=''
                        >
                            <MenuItem value='' />
                        </Select>
                    </TableCell>
                    <TableCell>
                        <IconButton disabled>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            );
        }

        const selectedUUIDs = [].concat(...value);
        const unselectedKeyboards = keyboards.filter(keyboard => selectedUUIDs.indexOf(keyboard.uuid) === -1);

        return value.map((group, index) => {
            return (
                <TableRow key={ index }>
                    <TableCell numeric>{ index }</TableCell>
                    <TableCell>
                        <Select
                            multiple
                            fullWidth
                            value={ group }
                            onChange={ (e) => this.updateGroup(e.target.value, index) }
                        >
                            {
                                [...unselectedKeyboards, ...group.map(uuid => keyboards.find(keyboard => keyboard.uuid === uuid))].map((keyboard, index) => {
                                    return (
                                        <MenuItem
                                            value={ keyboard.uuid }
                                            key={ index }
                                        >
                                            { keyboard.name }
                                        </MenuItem>
                                    );
                                })
                            }
                            { unselectedKeyboards.length + group.length === 0 ? <MenuItem value={ null }><em>None</em></MenuItem> : undefined }
                        </Select>
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={ (e) => this.removeGroup(index) }>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            );
        });
    }
    
    render() {
        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell numeric>#</TableCell>
                            <TableCell>Layout groups</TableCell>
                            <TableCell>
                                <IconButton onClick={ () => this.addGroup() }>
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { this.renderBody() }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

BuilderLayoutGroupSelector.propTypes = {
    classes: PropTypes.object.isRequired,
    // External props
    keyboards: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(PropTypes.array)
}

export default withStyles(styles)(BuilderLayoutGroupSelector);