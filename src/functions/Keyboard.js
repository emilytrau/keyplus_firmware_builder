import Key from './Key.js';

// Data structure which represents a keyboard
class Keyboard {
    constructor(data) {
        if (!(data.name && data.layout && data.matrixRows && data.matrixColumns && data.layers)) {
            throw new Error('Invalid keyboard data');
        }
        data.layers.forEach((layer) => {
            if (layer.length !== data.matrixColumns) {
                throw new Error('')
            }
        });

        this.name = data.name;
        this.layout = data.layout.map(keyData => new Key(keyData));
        this.matrixRows = data.matrixRows;
        this.matrixColumns = data.matrixColumns;
        
    }
}

export default Keyboard;