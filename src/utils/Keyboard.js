import Key from './Key.js';

// Data structure which represents a keyboard
class Keyboard {
    constructor(data) {
        if ((data.uuid && data.name && data.layout && data.matrixRows && data.matrixColumns && data.layers) === undefined) {
            throw new Error('Invalid keyboard data');
        }
        data.layers.forEach((layer) => {
            if (layer.length !== data.matrixRows) {
                throw new Error('Invalid')
            }
        });

        this.uuid = data.uuid;
        this.name = data.name;
        this.layout = data.layout.map(keyData => new Key(keyData));
        this.matrixRows = data.matrixRows;
        this.matrixColumns = data.matrixColumns;
        this.layers = data.layers;
    }
}

export default Keyboard;