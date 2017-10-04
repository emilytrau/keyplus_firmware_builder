import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectKey, zoomIn, zoomOut, zoomReset, selectLayer, selectMatrixView, flip } from './../actions/BuilderKeyboard.js';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ZoomInIcon from 'material-ui-icons/ZoomIn';
import ZoomOutIcon from 'material-ui-icons/ZoomOut';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { getShortLabel } from './../utils/Keycode.js';

const styles = theme => ({
    root: {
        display: 'flex',
        'align-items': 'center',
        'flex-flow': 'column',
        width: '100%',
        padding: theme.spacing.unit,
        'box-sizing':'border-box'
    },
    keyboardDisplay: {
        display: 'flex',
        'flex-flow': 'column',
        'align-items': 'center',
        position: 'relative',
        width: '100%'
    },
    scrollContainer: {
        position: 'absolute',
        width: '100%',
        'max-width': 'fit-content',
        'overflow-x': 'auto'
    },
    controls: {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        '& > *': {
            padding: theme.spacing.unit
        }
    },
    key: {
        '& > div': {
            position: 'absolute'
        },
        '&:hover > div > div': {
            background: 'lightgrey'
        }
    },
    keyFill: {
        ...theme.typography.body1,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'text-align': 'center',
        'padding': 2,
        position: 'absolute',
        left: 4,
        right: 4,
        top: 4,
        bottom: 4,
        'border-radius': 8,
        'user-select': 'none',
        'overflow-wrap': 'break-word',
        overflow: 'hidden',
        background: 'white',
        'z-index': 1
    },
    keyBorder: {
        position: 'absolute',
        left: 2,
        right: 2,
        top: 2,
        bottom: 2,
        'border-color': 'black',
        'border-width': 2,
        'border-radius': 8,
        'border-style': 'solid'
    },
    selected: {
        '& > div > div': {
            'border-color': 'red'
        }
    },
    matrixConnectionsOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        'pointer-events': 'none',
        'z-index': 1
    },
    matrixHorizontalLine: {
        stroke: 'blue',
        'stroke-width': 0.05
    },
    matrixVerticalLine: {
        stroke: 'red',
        'stroke-width': 0.05
    },
    matrixDot: {
        fill: 'grey'
    }
});

const mapStateToProps = (state, ownProps) => ({
    keyboard: state.app.kbcollection.keyboards[state.main.selectedKeyboard],
    selectedKeyIndex: state.keyboard.selectedKeyIndex,
    zoom: state.keyboard.zoom,
    layer: state.keyboard.layer,
    matrixView: state.keyboard.matrixView,
    flipped: state.keyboard.flipped
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onKeyClick: (index) => {
        dispatch(selectKey(index));
    },
    onZoomIn: () => {
        dispatch(zoomIn());
    },
    onZoomOut: () => {
        dispatch(zoomOut());
    },
    onZoomReset: () => {
        dispatch(zoomReset());
    },
    onSelectLayer: (layer) => {
        dispatch(selectLayer(layer));
    },
    onSelectMatrixView: (view) => {
        dispatch(selectMatrixView(view));
    },
    onFlip: () => {
        dispatch(flip());
    }
});

class BuilderKeyboard extends React.Component {
    render() {
        const { classes, keyboard, selectedKeyIndex, zoom, flipped, layer, matrixView, onKeyClick, onZoomIn, onZoomOut, onZoomReset, onSelectLayer, onSelectMatrixView, onFlip, keymap, matrix } = this.props;
        const [ maxWidth, maxHeight ] = keyboard.layout.reduce((prev, curr) => {
            return [
                Math.max(prev[0], curr.x + curr.width, curr.x + curr.x2 + curr.w2),
                Math.max(prev[1], curr.y + curr.height, curr.y + curr.y2 + curr.h2)
            ];
        }, [0, 0]);
        const keyboardDisplayWidth = maxWidth * zoom;
        const keyboardDisplayHeight = maxHeight * zoom;

        return (
            <div className={ classes.root }>
                <div className={ classes.controls }>
                    <IconButton onClick={ onZoomIn }>
                        <ZoomInIcon />
                    </IconButton>
                    <Button onClick={ onZoomReset }>
                        Reset
                    </Button>
                    <IconButton onClick={ onZoomOut }>
                        <ZoomOutIcon />
                    </IconButton>
                    <span />
                    <FormControlLabel
                        label='Flip'
                        control={
                            <Checkbox
                                checked={ flipped }
                                onChange={ onFlip }
                            />
                        }
                    />
                </div>
                <div
                    style={{ height:keyboardDisplayHeight + 20 }}
                    className={ classes.keyboardDisplay }
                >
                    <div className={ classes.scrollContainer }>
                        <div style={{
                            position: 'relative',
                            width: keyboardDisplayWidth,
                            height: keyboardDisplayHeight,
                            transform: flipped ? 'scaleX(-1)' : ''
                        }}>
                            {
                                keyboard.layout.map((key, index) => {
                                    const selected = selectedKeyIndex === index;
                                    const onClick = () => onKeyClick(index);
                                    const { x, y, width, height, x2, y2, w2, h2, row, column } = key;

                                    return (
                                        <div
                                            className={ classes.key + (selected ? ' ' + classes.selected : '') }
                                            onClick={ onClick }
                                            key={ index }
                                        >
                                            <div
                                                style={{
                                                    left: (x + x2) * zoom,
                                                    top: (y + y2) * zoom,
                                                    width: w2 * zoom,
                                                    height: h2 * zoom,
                                                    display: w2 === 0 && h2 === 0 ? 'none' : 'block'
                                                }}
                                            >
                                                <div className={ classes.keyBorder } />
                                                <div className={ classes.keyFill } />
                                            </div>
                                            <div style={{
                                                    left: x * zoom,
                                                    top: y * zoom,
                                                    width: width * zoom,
                                                    height: height * zoom
                                            }}>
                                                <div className={ classes.keyBorder } />
                                                <div
                                                    style={{
                                                        fontSize: zoom * 0.2,
                                                        lineHeight: zoom * 0.2 + 'px',
                                                        transform: flipped ? 'scaleX(-1)' : ''
                                                    }}
                                                    className={ classes.keyFill }
                                                >
                                                    {
                                                        keymap ? (
                                                            getShortLabel(keyboard.layers[layer][row][column])
                                                        ) : matrix && matrixView === 'values' ? (
                                                            row + ',' + column
                                                        ) : ''
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                // Matrix connections overlay
                                matrix && matrixView === 'connections' ? (() => {
                                    // Transform in to a 2D array of Array<Key>, with matrix row and column as the key
                                    const matrixKeyMap = keyboard.layout.reduce((prev, curr) => {
                                        return {
                                            ...prev,
                                            [curr.row]: {
                                                ...(prev[curr.row] || {}),
                                                [curr.column]: [
                                                    ...((prev[curr.row] || {})[curr.column] || {}),
                                                    curr
                                                ]
                                            }
                                        }
                                    }, {});

                                    const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
                                    const nearestNeighbor = (x, y, neighbors) => {
                                        return neighbors.reduce((prev, curr) => {
                                            const distanceToKey = distance(x, y, curr.x, curr.y);
                                            return distanceToKey < prev[1] ? [curr, distanceToKey] : prev
                                        }, [null, Number.MAX_VALUE])[0]
                                    }
                                    const getLinePointX = (key) => key.x + (key.width / 2);
                                    const getLinePointY = (key) => key.y + (key.height / 2);

                                    const lines = [].concat(...keyboard.layout.map((key, index) => {
                                        const { row, column } = key;
                                        const x = getLinePointX(key);
                                        const y = getLinePointY(key);

                                        const rightNeighbor = nearestNeighbor(x, y, ((matrixKeyMap[row] || {})[column + 1] || []));
                                        const bottomNeighbor = nearestNeighbor(x, y, ((matrixKeyMap[row + 1] || {})[column] || []));

                                        return [
                                            rightNeighbor ? (
                                                <line
                                                    x1={ x }
                                                    y1={ y }
                                                    x2={ getLinePointX(rightNeighbor) }
                                                    y2={ getLinePointY(rightNeighbor) }
                                                    className={ classes.matrixHorizontalLine }
                                                    key={ index * 3}
                                                />
                                             ) : null,
                                            bottomNeighbor ? (
                                                <line
                                                    x1={ x }
                                                    y1={ y }
                                                    x2={ getLinePointX(bottomNeighbor) }
                                                    y2={ getLinePointY(bottomNeighbor) }
                                                    className={ classes.matrixVerticalLine }
                                                    key={ index * 3 + 1}
                                                />
                                            ) : null,
                                            <circle 
                                                cx={ x }
                                                cy={ y }
                                                r={ 0.07 }
                                                className={ classes.matrixDot }
                                                key={ index * 3 + 2}
                                            />
                                        ];
                                    }));

                                    return (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            version='1.1'
                                            viewBox={ `0 0 ${ maxWidth } ${ maxHeight }` }
                                            className={ classes.matrixConnectionsOverlay }
                                        >
                                            { lines }
                                        </svg>
                                    );
                                })() : null
                            }
                        </div>
                    </div>
                </div>
                <div className={ classes.controls }>
                    {
                        keymap ? (
                            <span>
                                <TextField
                                    label='Layer'
                                    type='number'
                                    value={ layer }
                                    onChange={ (e) => onSelectLayer(Math.max(Math.min(e.target.value, 15), 0)) }
                                />
                            </span>
                        ) : matrix ? (
                            <RadioGroup
                                row
                                value={ matrixView }
                                onChange={ (e) => onSelectMatrixView(e.target.value) }
                            >
                                <FormControlLabel value='values' control={ <Radio /> } label='Show values' />
                                <FormControlLabel value='connections' control={ <Radio />} label='Show connections' />
                            </RadioGroup>
                        ) : <div />
                    }
                </div>
            </div>
        );
    }
}

BuilderKeyboard.propTypes = {
    classes: PropTypes.object.isRequired,
    keyboard: PropTypes.object.isRequired,
    selectedKeyIndex: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    flipped: PropTypes.bool.isRequired,
    layer: PropTypes.number.isRequired,
    matrixView: PropTypes.string.isRequired,
    onKeyClick: PropTypes.func.isRequired,
    onZoomIn: PropTypes.func.isRequired,
    onZoomOut: PropTypes.func.isRequired,
    onZoomReset: PropTypes.func.isRequired,
    onSelectLayer: PropTypes.func.isRequired,
    onSelectMatrixView: PropTypes.func.isRequired,
    onFlip: PropTypes.func.isRequired,
    // External props
    keymap: PropTypes.bool,
    matrix: PropTypes.bool
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BuilderKeyboard));